/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 */

import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";

import UserLoginScreen from "../panel/user/UserLoginScreen";
import UserNavBar from "../component/user/UserNavBar";
import AdminNavBar from "../component/admin/AdminNavBar";

const Resolver = ({ component: Component, ...rest }) => {
  const { state: authState, tryLocalLogin } = useContext(AuthContext);
  const [isStateReady, setIsStateReady] = useState(0);

  useEffect(() => {
    (async () => {
      await tryLocalLogin();
      setIsStateReady((state) => ({ ...state, isStateReady: 1 }));
      // console.log(authState);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isStateReady)
    return (
      <>
        <Route
          {...rest}
          path={rest.path}
          render={(props) => {
            /**
             * 2 scenarios:
             *    1. trying to access /, or /user/login
             *          if logged in, show home
             *          if not, show user login
             *    2. trying to access an unknown destination
             *          check scope => if scope matches, allow the path
             *                         else, redirect to user login
             *
             */
            // console.log(authState);
            if (rest.path === "/" || rest.path === "/user/login") {
              if (authState.role === "user") {
                return <Redirect to="/user/home" />;
              } else if (authState.role === "admin")
                return <Redirect to="/admin/manage/user" />;
              else if (authState.role === null && rest.path === "/") {
                return <Redirect to="/user/login" />;
              } else if (
                authState.role === null &&
                rest.path === "/user/login"
              ) {
                return <UserLoginScreen />;
              }
            }

            if (rest.path.startsWith("/user") && authState.role === "user") {
              return (
                <UserNavBar>
                  {" "}
                  <Component {...props} />{" "}
                </UserNavBar>
              );
            } else if (
              rest.path.startsWith("/admin") &&
              authState.role === "admin"
            ) {
              return (
                <AdminNavBar>
                  {" "}
                  <Component {...props} />{" "}
                </AdminNavBar>
              );
            } else {
              return <Redirect to="/user/login" />;
            }
          }}
        />
      </>
    );
  else return null;
};

export default Resolver;
