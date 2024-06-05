class Auth {
  async getUser() {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/getUser`,
      {
        method: "GET",

        credentials: "include",
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
      }
    );
    return await response.json();
  }

  async login(username, password, email) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      }
    );

    const data = await response.json();
    localStorage.setItem("token", data.data);
    return data;
  }

  async register(fullName, username, password, email) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/register`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          email,
        }),
      }
    );

    const data = await response.json();
    return data;
  }

  async logout() {
    localStorage.setItem("token", "");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }
}

const auth = new Auth();
export default auth;
