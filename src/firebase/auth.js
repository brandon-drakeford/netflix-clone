import { auth } from "../firebase"
import { toastMessages } from "../components/Utilities";

export const authLogin = async (userInfo) => {
    await auth.signInWithEmailAndPassword(userInfo.email, userInfo.password).then((response) => {
        return response
    }).catch((error) => {
        let errorMessage;

        if (error.code.includes('user-not-found')) {
            errorMessage = `We did not find an account for ${userInfo.email}. Please sign up now!`; 
        } else if (error.code.includes('wrong-password')) {
            errorMessage = 'Password is invalid. Please try again!'
        } else if (error.code.includes('too-many-requests')) {
            errorMessage = 'There has been too many requests from this account. Please try again later!'
        }
        return toastMessages('error', errorMessage);
    }) 
}

export const authRegister = async (userInfo) => {
    await auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then((response) => {
        let currentUser = response.user.auth.currentUser;

        currentUser.updateProfile({ displayName: userInfo.fullName }) 
        return currentUser
    }).catch(error => {
        let errorMessage;

        if (error.code.includes('in-use')) {
            errorMessage = `An account already exists for ${userInfo.email}. Please sign in!`
        }
        return toastMessages('error', errorMessage);
    })  
}