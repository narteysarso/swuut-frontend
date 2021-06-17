import { API_BASE } from "../../.env";

const STAFF_API = `${API_BASE}/staffs`;

const HEADERS = {
    Authorization: "Bearer"

}

export const fetchAllStaff = ({ page, pageSize }) => {

    let url = `${STAFF_API}?page_size=${pageSize}`;
    if (page) {
        url = `${url}&offset=${page}`
    }
    return fetch(url, {
        headers: { ...HEADERS }
    }).then(res => res.json());
};


export const addStaff = (data) => {
    let url = `${STAFF_API}`;

    return fetch(url, {
        method: "POST",
        headers: {
            ...HEADERS,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const updateStaff = (data) => {
    let url = `${STAFF_API}/${data.id}`;

    return fetch(url, {
        method: "PUT",
        headers: {
            ...HEADERS,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const deleteStaff = (id) => {
    let url = `${STAFF_API}/${id}`;

    return fetch(url, {
        method: "DELETE",
        headers: {
            ...HEADERS,
        }   
    })
}


