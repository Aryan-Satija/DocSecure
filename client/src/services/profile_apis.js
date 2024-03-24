const BASE_URL = process.env.SERVER_BASE_URL || `https://docsecure.onrender.com/api/v1`

export const PROFILE_APIS = {
    fetch_my_profile_api: BASE_URL + '/profile/fetch-my-profile'
}