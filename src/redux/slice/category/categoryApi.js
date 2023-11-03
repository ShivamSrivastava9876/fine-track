export async function getCategory() {
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
            'http://192.168.29.138:8000/admin_panel/category-list/',
            {
                method: "GET",
                headers: header
            }
        )
        if (response.ok) {
            const data = await response.json();
            return { data }
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

export async function createCategory(categoryInfo) {
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
            'http://192.168.29.138:8000/admin_panel/create-category/',
            {
                method: "POST",
                headers: header,
                body: JSON.stringify(categoryInfo)
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

export async function editCategory(editCategoryInfo, categoryId) {
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
            `http://192.168.29.138:8000/admin_panel/${categoryId}/update-category/`,
            {
                method: "PUT",
                headers: header,
                body: JSON.stringify(editCategoryInfo)
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

export async function deleteCategory (categoryId) {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            "content-type": "application/json",
            Authorization: `token ${token}`
        }

        const response = await fetch(
            `http://192.168.29.138:8000/admin_panel/${categoryId}/delete-category/`,
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