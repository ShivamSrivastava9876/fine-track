export async function getApproveList() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://192.168.29.154:8000/admin_panel/approve-order-list/',
            {
                method: 'GET',
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
        else {
            const error = await response.text();
            return { error };
        }

    }
    catch (error) {
        return { error }
    }
};

export async function approveOrder(orderApproval) {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            `http://192.168.29.154:8000/admin_panel/order-to-approve/${orderApproval.orderId}/`,
            {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(orderApproval.orderInfo)
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data };
        }
        else {
            const error = await response.text();
            return { error };
        }

    }
    catch (error) {
        return { error }
    }
}


