/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 */

import createDataContext from "./createDataContext";
import apiManager from "../api/apiManager";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login_admin":
      return {
        ...state,
        token: action.payload,
        role: "admin",
        authMessage: null,
      };
    case "login_user":
      return {
        ...state,
        token: action.payload,
        role: "user",
        authMessage: null,
      };
    case "logout":
      return { ...state, token: null, role: null, authMessage: null };
    case "user_info":
      return { ...state, userInfo: action.payload, authMessage: null };
    case "auth_message":
      return { ...state, authMessage: action.payload };
    default:
      return state;
  }
};

const tryLocalLogin = (dispatch) => async () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token) {
    if (role === "admin") dispatch({ type: "login_admin", payload: token });
    if (role === "user") dispatch({ type: "login_user", payload: token });
  }
};

const login_user =
  (dispatch) =>
  async ({ username, password }) => {
    try {
      const response = await apiManager.post("/api/auth/login", {
        name: username,
        password: password,
      });
      // console.log(response.data.token);
      if (response.data.token) {
        dispatch({ type: "login_user", payload: response.data.token });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "user");
      }
      return 0;
    } catch (e) {
      console.error(e);
      if (e.response.status == 502) {
        dispatch({
          type: "auth_message",
          payload: "Backend server is offline",
        });
      } else {
        dispatch({ type: "auth_message", payload: e.response.data.msg });
      }
      return e;
    }
  };

const register_user =
  (dispatch) =>
  async ({ username, password }) => {
    try {
      const response = await apiManager.post("/api/auth/register", {
        name: username,
        password: password,
      });
      // console.log(response.data.token);
      if (response.data.token) {
        dispatch({ type: "login_user", payload: response.data.token });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "user");
      }

      await apiManager
        .patch("/api/user/longlat", {
          latitude: 22.419511073104125,
          longitude: 114.2063355445862,
        })
        .catch((e) => console.log(e.response));
    } catch (e) {
      console.error(e.response.data);
      if (e.response.status === 502) {
        dispatch({
          type: "auth_message",
          payload: "Backend server is offline",
        });
      } else {
        dispatch({ type: "auth_message", payload: e.response.data.msg });
      }
      return e;
    }
  };

const login_admin = (dispatch) => async () => {
  try {
    const response = await apiManager.get("/api/auth/login/admin");
    dispatch({ type: "login_admin", payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", "admin");
  } catch (e) {
    console.error(e.response);
    if (e.response.status === 502) {
      dispatch({ type: "auth_message", payload: "Backend server is offline" });
    } else {
      dispatch({ type: "auth_message", payload: "Could not login admin" });
    }
  }
};

const logout = (dispatch) => async () => {
  dispatch({ type: "logout", payload: null });
  localStorage.setItem("token", null);
  localStorage.setItem("role", null);
};

const getUser = (dispatch) => async () => {
  await apiManager
    .get("/api/auth/user")
    .then((response) => {
      dispatch({ type: "user_info", payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: "auth_message", payload: error.response });
    });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login_user, register_user, login_admin, logout, tryLocalLogin, getUser },
  { token: null, role: null, userInfo: null, authMessage: null }
);
