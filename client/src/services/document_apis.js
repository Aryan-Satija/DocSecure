// const BASE_URL = process.env.SERVER_BASE_URL || `https://docsecure.onrender.com/api/v1`;
const BASE_URL = 'http://localhost:8080/api/v1'
export const DOCUMENT_APIS = {
    create_document_api : BASE_URL + `/document/create`,
    get_document_api : BASE_URL + `/document/get`,
}