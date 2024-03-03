const BASE_URL = process.env.SERVER_BASE_URL || `http://localhost:8080/api/v1`;

export const PDF_APIS = {
    encrypt_pdf_api : BASE_URL + `/pdf/encrypt-my-pdf`
}