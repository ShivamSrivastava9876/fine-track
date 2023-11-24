export async function getCategory() {
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
            'http://192.168.29.154:8000/admin_panel/category-list/',
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
            Authorization: `Token ${token}`
        }
        const formData = new FormData();
        formData.append("category_name", categoryInfo.category_name);
        formData.append("image", categoryInfo.image);
        const response = await fetch(
            'http://192.168.29.154:8000/admin_panel/create-category/',
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
        return { error };
    }
}

export async function editCategory(categoryInfo) {
    try {
        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            Authorization: `Token ${token}`
        }
        const formData = new FormData();
        formData.append("category_name", categoryInfo.category);
        formData.append("image", categoryInfo.image);
        const response = await fetch(
            `http://192.168.29.154:8000/admin_panel/${categoryInfo.id}/update-category/`,
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
            "Content-type": "application/json",
            Authorization: `token ${token}`
        }

        const response = await fetch(
            `http://192.168.29.154:8000/admin_panel/${categoryId}/delete-category/`,
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

export async function searchCategory(searchCategoryInfo) {
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
        `http://192.168.29.154:8000/admin_panel/category-list/?search=${searchCategoryInfo}`,
        {
          method: "GET",
          headers: header
        }
      );
  
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
      return { error };
    }
  }

 