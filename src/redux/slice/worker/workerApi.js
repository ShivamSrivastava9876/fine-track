export async function getWorker() {
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
        "http://77.37.44.105:8000/admin_panel/worker-user-list/",
        {
          method: "GET",
          headers: header,
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
  
  export async function createWorker(createWorkerInfo) {
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
        "http://77.37.44.105:8000/admin_panel/create-worker-user/",
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(createWorkerInfo),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      else {
        const error = await response.json();
        return { error };
      }
    }
    catch (error) {
      return { error };
    }
  }
  
  export async function searchUser(searchUserInfo) {
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
        `http://77.37.44.105:8000/admin_panel/userdetail/?search=${searchUserInfo}`,
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
  
  export async function deleteWorker(workerId) {
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
        `http://77.37.44.105:8000/admin_panel/delete-worker-user/${workerId}/`,
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

  export async function editWorker(workerInfo) {
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
            `http://77.37.44.105:8000/admin_panel/update-worker-user/${workerInfo.workerId}/`,
            {
                method: "PUT",
                headers: header,
                body: JSON.stringify(workerInfo)
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
  