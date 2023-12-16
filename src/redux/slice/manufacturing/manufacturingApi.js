export async function getManufacturingOrderList() {
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
            'http://195.35.22.200:8000/admin_panel/manufacturing-list/',
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

export async function getManufacturingProduct() {
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
            'http://195.35.22.200:8000/admin_panel/manufacturing-product-list/',
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

export async function getManufacturingUser() {
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
            'http://195.35.22.200:8000/admin_panel/manufacturing-user-list/',
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

export async function createManufacturingOrder(createManufacturingOrderInfo) {
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
        "http://195.35.22.200:8000/admin_panel/create-manufacturing/",
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(createManufacturingOrderInfo),
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

  export async function updateManufacturingOrder(updateManufacturingOrderInfo) {
    try {

        function getToken() {
            return localStorage.getItem("token");
        }
        const token = getToken();
        const header = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
        
        const response = await fetch(
            `http://195.35.22.200:8000/admin_panel/${updateManufacturingOrderInfo.id}/update-manufacturing/`,
            {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(updateManufacturingOrderInfo)
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

export async function deleteManufacturingOrder(orderId) {
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
            `http://195.35.22.200:8000/admin_panel/${orderId}/delete-manufacturing/`,
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