import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import { getCustomerSubscription, loadStripeCheckout }  from '../../firebase/collections';
import Loader from '../common/Loader';
import _ from 'lodash';
import '../../css/Plans.css';

function Plans() {
    const [products, setProducts] = useState([]);
    
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(getCustomerSubscription(user.user?.uid));
    }, [user.user?.uid, dispatch])

    useEffect(() => {
        db.collection('products')
          .where('active', '==', true)
          .get()
          .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();

                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices ={
                        priceId: price.id,
                        priceData: price.data()
                    };
                })
            });

            setProducts(products);
          });  
    }, [])

    const loadCheckout = (priceId) => {
        dispatch(loadStripeCheckout({ userID: user.user?.uid, priceID: priceId }));
    }
        
  return (
    <div className='plansScreen'>
        {user.loading ? (
            <Loader size="4x" />
        ) : (
            <>
                {!_.isEmpty(user.subscription) && <p>Renewal Date: {new Date(user.subscription?.current_end * 1000).toLocaleDateString()}</p>}
        
                {Object.entries(products).map(([productId, productData]) => {
                    const isCurrentPackage = productData.name?.toLowerCase().includes(user.subscription?.role);

                    return (
                        <div key={productId} className={`${isCurrentPackage || (user.loadingCheckout && user.priceID === productData.prices.priceId) ? "plansScreen__plan--disabled" : ""} plansScreen__plan`}>
                            <div className='plansScreen__info'>
                                <h5>{productData.name}</h5>
                                <h6>{productData.description}</h6>
                            </div>

                            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                                {user.loadingCheckout && user.priceID === productData.prices.priceId ? (<Loader size="1x" customClass="load-checkout" text="Redirecting..." />) : isCurrentPackage ? 'Current Package' 
                                    : 'Subscribe'}
                            </button>
                        </div>
                    )
                })}
            </>
        )}
    </div>
  )
}

export default Plans