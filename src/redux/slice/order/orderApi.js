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
            'http://77.37.44.105:7000/admin_panel/approve-order-list/',
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
            `http://77.37.44.105:7000/admin_panel/order-to-approve/${orderApproval.orderId}/`,
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

export async function declineOrder(orderDecline) {
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
            `http://77.37.44.105:7000/admin_panel/order-to-approve/${orderDecline.orderId}/`,
            {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(orderDecline.orderInfo)
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

//Create order on order table
export async function createOrder(orderDetails) {
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
            'http://77.37.44.105:7000/orders/create-order/',
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(orderDetails)
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

//Get order list on order table
export async function getOrder() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://77.37.44.105:7000/orders/order-list/',
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

export async function searchOrder(searchOrderInfo) {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `Token ${token}`,
        };
        const response = await fetch(
            `http://77.37.44.105:7000/orders/orderitem-search/?search=${searchOrderInfo}`,
            {
                method: "GET",
                headers: header
            }
        );

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
        return { error };
    }
}

export async function getConfirmOrder() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://77.37.44.105:7000/admin_panel/cofirm-order-list/',
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

export async function getDeliveredOrder() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://77.37.44.105:7000/admin_panel/delivered-order-list/',
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

export async function getCancelledOrder() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://77.37.44.105:7000/admin_panel/cancelled-order-list/',
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

export async function getDeclinedOrder() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://77.37.44.105:7000/admin_panel/decline-order-list/',
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

export async function getLiveManufacturingOrder() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://77.37.44.105:7000/admin_panel/manufacture-list/',
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

export async function getDashboardDetails() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            // "Content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://77.37.44.105:7000/admin_panel/dashboard-details/',
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

export async function updatePreviousBalanceOfCustomer(updateInfo) {
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
            `http://77.37.44.105:7000 /orders/update-customer/previous-fine/${updateInfo.customerId}/`,
            {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(updateInfo)
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