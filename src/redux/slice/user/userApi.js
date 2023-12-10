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
      "http://195.35.22.200:8000/admin_panel/userdetail/",
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
      "http://195.35.22.200:8000/admin_panel/create-new-user/",
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
      `http://195.35.22.200:8000/admin_panel/userdetail/?search=${searchUserInfo}`,
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
      `http://195.35.22.200:8000/admin_panel/${userId}/delete-user/`,
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

export async function userActive(userId, userStatus) {
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
      `http://195.35.22.200:8000/admin_panel/update-user/${userId}/`,
      {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(userStatus)
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
