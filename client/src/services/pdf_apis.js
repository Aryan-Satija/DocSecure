// const BASE_URL = process.env.SERVER_BASE_URL || `https://docsecure.onrender.com/api/v1`;
const BASE_URL = 'http://localhost:8080/api/v1'
export const PDF_APIS = {
    encrypt_pdf_api : BASE_URL + `/pdf/encrypt-my-pdf`,
    encrypt_user_pdf_api: BASE_URL + `/pdf/encrypt-user-pdf`
}