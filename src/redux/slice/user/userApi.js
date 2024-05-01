export async function userDetails() {
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
      "http://77.37.44.105:7000/admin_panel/customer-list/",
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

export async function createUser(createUserInfo) {
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
      "http://77.37.44.105:7000/admin_panel/create-customer/",
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(createUserInfo),
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
      `http://77.37.44.105:7000/admin_panel/customer-list/?search=${searchUserInfo}`,
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

export async function deleteUser(userId) {
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
      `http://77.37.44.105:7000/admin_panel/delete-customer/${userId}/`,
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

export async function updateUser(updateUserInfo) {
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
      `http://77.37.44.105:7000/admin_panel/update-customer/${updateUserInfo.id}/`,
      {
        method: "PUT",
        headers: header,
        body: JSON.stringify(updateUserInfo),
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