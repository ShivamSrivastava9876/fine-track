export async function getProductType() {
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
            'http://77.37.44.105:7000/admin_panel/product-type-list/',
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

export async function getSelectedProductType(selectedCategory) {
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
            `http://77.37.44.105:7000/admin_panel/filter-by-category/?category=${selectedCategory}`,
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

export async function createProductType(newProductType) {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            Authorization: `Token ${token}`
        }
        const formData = new FormData();
        formData.append("category", newProductType.category);
        formData.append("product_type", newProductType.product_type);
        formData.append("image", newProductType.image);
        const response = await fetch(
            'http://77.37.44.105:7000/admin_panel/create-product-type/',
            {
                method: "POST",
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
}

export async function updateProductType(editProductTypeInfo) {
    //also pass productTypeId in the editProductTypeInfo
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            Authorization: `Token ${token}`
        }
        const productTypeId = editProductTypeInfo.productTypeId;
        const formData = new FormData();
        formData.append("category", editProductTypeInfo.category);
        formData.append("product_type", editProductTypeInfo.product_type);
        formData.append("image", editProductTypeInfo.image);
        const response = await fetch(
            `http://77.37.44.105:7000/admin_panel/${productTypeId}/update-product-type/`,
            {
                method: "PUT",
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
}

export async function deleteProductType(productTypeId) {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "Content-type": "application/json",
            Authorization: `token ${token}`
        }

        const response = await fetch(
            `http://77.37.44.105:7000/admin_panel/${productTypeId}/delete-product-type/`,
            {
                method: "DELETE",
                headers: header
            }
        )

        if (response.ok) {
            const data = response.json();
            return { data };
        }
        else {
            const error = await error.text();
            return { error }
        }
    }
    catch (error) {
        return { error };
    }
}

export async function searchProductType(searchProductTypeInfo) {
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
            `http://77.37.44.105:7000/admin_panel/product-type-list/?search=${searchProductTypeInfo}`,
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