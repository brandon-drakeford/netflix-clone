import db from './'
import { loadStripe } from '@stripe/stripe-js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const getCustomerSubscription = createAsyncThunk('subscription/getSubscription', async (userID) => {
    let userSubscription = {};

    await db.collection('customers')
      .doc(userID)
      .collection('subscriptions')
      .get()
      .then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                if (subscription) {
                    userSubscription = {
                        role: subscription.data().role,
                        current_start: subscription.data().current_period_start.seconds,
                        current_end: subscription.data().current_period_end.seconds
                    }   
                }
            })
        })
    
    return userSubscription;
})

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const products = {};

    await db.collection('products')
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (productDoc) => {
            
            products[productDoc.id] = productDoc.data();
            
            const priceSnap = await productDoc.ref.collection('prices').get();
            
            priceSnap.docs.forEach(price => ({
                ...products[productDoc.id],
                prices: {
                    priceId: price.id,
                    priceData: price.data()
                }
            }))
        });
    });

    return products;
})

export const loadStripeCheckout = createAsyncThunk('checkout/loadCheckout', async (subscription) => {
    const docRef = await db
        .collection('customers')
        .doc(subscription.userID)
        .collection('checkout_sessions')
        .add({
            price: subscription.priceID,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });
        
        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();
            
            if (error) {
                return toast.error(`An Error occured: ${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

            if (sessionId) {
                const stripe = await loadStripe('pk_test_51KosdSHK72Kf1poR3cnkNx4S5Cutst3Zmyjkb2VZSRotV1xjS2rNju7fTsEpSmCEKsMhiEv8zLzbuZBx2qd78AHM00D62Swwbx');

                stripe.redirectToCheckout({ sessionId });
            }
        })
    return subscription.priceID;
})