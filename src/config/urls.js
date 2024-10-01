import { API_GATEWAY_URL } from "./env-vars";
export const API_BASE_URL = API_GATEWAY_URL

export const getApiUrl = (endpoint) => API_BASE_URL + '/auth' + endpoint;

export const LOGIN = getApiUrl('/cogni_login')
export const SIGNUP = getApiUrl('/cogni_signup')
export const SIGNUPCONFIRMATION= getApiUrl('/cogni_signupconfirmation')
export const RESENDSIGNUPOTP = getApiUrl('/cogni_resendsignupotp') 


export const FORGOTPASSWORD = getApiUrl('/cogni_forgotpassword')
export const CONFIRMFORGOTPASSWORD = getApiUrl('/cogni_forgotpassconfirm')

export const SETUPPASSCODE = getApiUrl('/cogni_setuppasscode')
export const GETPASSCODE = getApiUrl('/cogni_getpasscode')
export const RESETPASSCODE  = getApiUrl('/cogni_resetpasscode')

export const UPDATE_ADD_USERDETAILS = getApiUrl('/cogni_update_add_userdetails')

export const UPLOADPROFILEPIC = getApiUrl('/cogni_uploadprofilepic')
