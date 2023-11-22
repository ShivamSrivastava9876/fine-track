export async function getProduct() {
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
            'http://192.168.29.154:8000/admin_panel/product-item-list/',
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

export async function createProduct(newProductInfo) {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            Authorization: `Token ${token}`
        }
        console.log("category ",newProductInfo.category)
        console.log("product type ",newProductInfo.product_type)
        const formData = new FormData();
        formData.append("category", newProductInfo.category);
        formData.append("product_type", newProductInfo.product_type);
        formData.append("product_id", newProductInfo.product_id);
        formData.append("product_name", newProductInfo.product_name);
        formData.append("hu_id", newProductInfo.hu_id);
        formData.append("model", newProductInfo.model);
        formData.append("sub_model", newProductInfo.sub_model);
        formData.append("gross_wt", newProductInfo.gross_wt);
        formData.append("stone_wt", newProductInfo.stone_wt);
        formData.append("purity_spec", newProductInfo.purity_spec);
        formData.append("price", newProductInfo.price);
        formData.append("quantity", newProductInfo.quantity);
        formData.append("image", newProductInfo.image);
        formData.append("description", newProductInfo.description);
        formData.append("is_available", newProductInfo.is_available);
        const response = await fetch(
            'http://192.168.29.154:8000/admin_panel/add/product-item/',
            {
                method: 'POST',
                headers: header,
                body: formData
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

export async function updateProduct(updateProductInfo) {
    try {
        
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            Authorization: `Token ${token}`
        }
        console.log("update", updateProductInfo.productId)
        
        //also get productId in updateProductInfo
        const formData = new FormData();
        formData.append("category", updateProductInfo.category);
        formData.append("product_type", updateProductInfo.product_type);
        formData.append("product_id", updateProductInfo.product_id);
        formData.append("product_name", updateProductInfo.product_name);
        formData.append("hu_id", updateProductInfo.hu_id);
        formData.append("model", updateProductInfo.model);
        formData.append("sub_model", updateProductInfo.sub_model);
        formData.append("gross_wt", updateProductInfo.gross_wt);
        formData.append("stone_wt", updateProductInfo.stone_wt);
        formData.append("purity_spec", updateProductInfo.purity_spec);
        formData.append("price", updateProductInfo.price);
        formData.append("quantity", updateProductInfo.quantity);
        formData.append("image", updateProductInfo.image);
        formData.append("description", updateProductInfo.description);
        formData.append("is_available", updateProductInfo.is_available);
        
        const response = await fetch(
            `http://192.168.29.154:8000/admin_panel/update/${updateProductInfo.productId}/product-item/`,
            {
                method: 'PUT',
                headers: header,
                body: formData
            }
        )
        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
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

export async function deleteProduct(productId) {
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
            `http://192.168.29.154:8000/admin_panel/delete/${productId}/product-item/`,
            {
                method: 'DELETE',
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

export async function searchProduct(searchProductInfo) {
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
            `http://192.168.29.154:8000/admin_panel/product-item-list/?search=${searchProductInfo}`,
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