import axios from "axios";
import { LOGIN_ENDPOINT } from "../helpers/endpoints";
import { SET_CURRENT_USER } from "./types";
import jwt_decode from 'jwt-decode';
import setAuthToken from "../helpers/setAuthToken";

export const loginUser = (userData) => dispatch => {
    console.log(userData);
    return new Promise((resolve, reject) => {
        axios.post(LOGIN_ENDPOINT,userData, {
            headers: {'Accept':'application/json','Content-type':'application/json'}
        }).then(response => {

            const {authorization, userId} = response.headers;
            localStorage.setItem('jwtToken',authorization);

            setAuthToken(authorization);

            const decoded = jwt_decode(authorization);

            dispatch(setCurrentUser({user:decoded, loggedIn: true }))


            console.log(response);
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    });



}


export const setCurrentUser = ({user,loggedIn}) => {
    return {
        type: SET_CURRENT_USER,
        payload: {user, loggedIn}
    };
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({
        user:{},
        loggedIn:false
    }));
}