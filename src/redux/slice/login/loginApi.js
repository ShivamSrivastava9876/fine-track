export async function loginUser(loginInfo) {
  try {
    const response = await fetch(
      "http://192.168.29.138:8000/users/user-login/",
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
      const error = await response.text();
      throw error;
    }
  } catch (error) {
    throw error;
  }
}