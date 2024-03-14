const BASE_URL = process.env.SERVER_BASE_URL || `http://localhost:8080/api/v1`

export const PROFILE_APIS = {
    fetch_my_profile_api: BASE_URL + '/fetch-my-profile'
}