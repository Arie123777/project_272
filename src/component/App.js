/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 */

import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

import UserLoginScreen from "../panel/user/UserLoginScreen";
import UserHomeScreen from "../panel/user/UserHomeScreen";
import UserMapScreen from "../panel/user/UserMapScreen";
import UserFavouriteScreen from "../panel/user/UserFavouriteScreen";
import AboutScreen from "../panel/user/AboutScreen";

import AdminUserCRUD from "../panel/admin/AdminUserCRUD";
import AdminLocCRUD from "../panel/admin/AdminLocCRUD";
import AdminUpdate from "../panel/admin/AdminUpdate";

import { Provider as GameProvider } from "../context/GameContext";
import { Provider as AuthProvider } from "../context/AuthContext";
import Resolver from "../panel/Resolver";

const App = () => {
  return (
    <GameProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Resolver path="/" exact component={Resolver} />

            <Resolver path="/user/login" exact component={UserLoginScreen} />
            <Resolver path="/user/home" exact component={UserHomeScreen} />
            <Resolver path="/user/map/:loc_id?" component={UserMapScreen} />
            <Resolver
              path="/user/favourite"
              exact
              component={UserFavouriteScreen}
            />
            <Resolver path="/user/about" exact component={AboutScreen} />

            <Resolver
              path="/admin/manage/user"
              exact
              component={AdminUserCRUD}
            />
            <Resolver
              path="/admin/manage/location"
              exact
              component={AdminLocCRUD}
            />
            <Resolver path="/admin/update" exact component={AdminUpdate} />
          </Switch>
        </Router>
      </AuthProvider>
    </GameProvider>
  );
};

export default App;
