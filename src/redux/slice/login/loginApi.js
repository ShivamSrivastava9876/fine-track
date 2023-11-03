export async function loginUser(loginInfo) {
  try {
    const response = await fetch(
      "http://192.168.29.138:8000/admin_panel/login/",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginInfo),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };

    } else {
      const error = await response.json();
      return { error };
    }
  }
  catch (error) {
    return { error };
  }
}

export async function logoutUser() {
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
      "http://192.168.29.138:8000/admin_panel/logout/",
      {
        method: "POST",
        headers: header
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };

    } else {
      const error = await response.json();
      return { error };
    }
  }
  catch (error) {
    return { error };
  }
}