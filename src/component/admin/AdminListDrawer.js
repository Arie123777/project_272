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
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const AdminNavBar = (props) => {
  const [isUserCRUD, setUserCRUD] = useState(false);

  export const mainListItems = (
    <div>
      <ListItem button component={Link} to="/admin/manage/user">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User CRUD" />
      </ListItem>
      <ListItem button component={Link} to="/admin/manage/location">
        <ListItemIcon>
          <EditLocationIcon />
        </ListItemIcon>
        <ListItemText primary="Location CRUD" />
      </ListItem>
    </div>
  );
};
