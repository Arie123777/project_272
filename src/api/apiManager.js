/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 */

import axios from "axios";
import GLOABLS from "../global";

let url = GLOABLS.BASE_URL;

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
