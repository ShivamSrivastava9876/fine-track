export async function getProductType() {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "content-type": "application/json",
            Authorization: `Token ${token}`
        }
        const response = await fetch(
            'http://192.168.29.138:8000/admin_panel/product-type-list/',
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
        return { error };
    }
}

// export async function 