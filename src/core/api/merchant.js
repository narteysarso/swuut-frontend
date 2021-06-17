import { API_BASE } from "../../.env";

const MERCHANT_API = `${API_BASE}/merchants`;

const HEADERS = {
    Authorization: "Bearer"

}

export const addMerchant = (data) => {
    let url = `${MERCHANT_API}`;

    return fetch(url, {
        method: "POST",
        headers: {
            ...HEADERS,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const fetchAllMerchant = ({ page, pageSize }) => {

    let url = `${MERCHANT_API}?page_size=${pageSize}`;
    if (page) {
        url = `${url}&offset=${page}`
    }
    return fetch(url, {
        headers: { ...HEADERS }
    }).then(res => res.json());
};

export const updateMerchant = (data) => {
    let url = `${MERCHANT_API}/${data.id}`;

    return fetch(url, {
        method: "PUT",
        headers: {
            ...HEADERS,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const deleteMerchant = (id) => {
    let url = `${MERCHANT_API}/${id}`;

    return fetch(url, {
        method: "DELETE",
        headers: {
            ...HEADERS,
        }   
    })
}