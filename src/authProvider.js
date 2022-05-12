// import decodeJwt from "jwt-decode";
// const authURL = "https://gor-orchid-backend-production.up.railway.app/v1/auth";
const authURL = `${process.env.REACT_APP_SERVER_URL}/auth`;

const authProvider = {
  // called when the user attempts to log in
  login: ({ email, password }) => {
    const request = new Request(`${authURL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ tokens, user }) => {
        const { access } = tokens;
        const { role } = user;
        const accessToken = access.token;
        // const refreshToken = refresh.token;
        // const decodedToken = decodeJwt(accessToken);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("permissions", role);
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    // if (status === 401 || status === 403) {
    //   localStorage.removeItem("token");
    //   return Promise.reject();
    // }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
