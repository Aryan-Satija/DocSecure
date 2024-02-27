const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AUTH_APIS = {
    login_api: BASE_URL + `/auth/login`,
    signup_api: BASE_URL + `/auth/signup`,
    sendotp_api: BASE_URL + `/auth/sendotp`
}