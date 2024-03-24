const BASE_URL = process.env.SERVER_BASE_URL || `https://docsecure.onrender.com/api/v1`;

export const AUTH_APIS = {
    login_api: BASE_URL + `/auth/login`,
    signup_api: BASE_URL + `/auth/signup`,
    sendotp_api: BASE_URL + `/auth/sendotp`
}