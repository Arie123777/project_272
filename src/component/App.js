/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 * Fan Dezen 1155143810
 */

import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

import Resolver from "../screens/Resolver";

import UserLoginScreen from "../screens/user/UserLoginScreen";
import UserHomeScreen from "../screens/user/UserHomeScreen";
import UserMapScreen from "../screens/user/UserMapScreen";
import UserFavouriteScreen from "../screens/user/UserFavouriteScreen";
import AboutScreen from "../screens/user/AboutScreen";

import AdminUserCRUD from "../screens/admin/AdminUserCRUD";
import AdminLocCRUD from "../screens/admin/AdminLocCRUD";
import AdminUpdate from "../screens/admin/AdminUpdate";

import { Provider as AuthProvider } from "../context/AuthContext";
import { Provider as GameProvider } from "../context/GameContext";

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
