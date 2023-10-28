export async function userDetails() {
  try {
    function getToken() {
      return localStorage.getItem("token");
    }
    const token = getToken();
    console.log(token);
    const header = {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(
      "http://192.168.29.138:8000/admin_panel/userdetail/",
      {
        method: "GET",
        headers: header,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

export async function createUser() {
  try {
    const response = await fetch(
      "http://192.168.29.138:8000/admin_panel/create-new-user/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(createUserInfo),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = response.text();
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
