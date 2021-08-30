import config from "./config";
import TokenService from "./token-service";

const AuthApiService = {
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getProducts() {
    return fetch(`${config.API_ENDPOINT}/productRoutes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getCartProducts() {
    return fetch(`${config.API_ENDPOINT}/cartRoutes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  addCartProduct({ title, description, company, img, price, stock, shipping, digitalProduct, rating, ownerId }) {
    return fetch(`${config.API_ENDPOINT}/cartRoutes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ title, description, company, img, price, stock, digitalProduct, rating, ownerId }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default AuthApiService;
