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
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import apiManager from "../../api/apiManager";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(8),
  },
}));

const AdminUpdate = () => {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          apiManager
            .request({
              method: "post",
              url: "api/admin/update/reload",
            })
            .then((response) => alert("Successful Reload"))
            .catch((e) => alert("Reload Error"));
        }}
      >
        Reload geodata from geodata.gov.hk
      </Button>
      <br />
      <div className={classes.root}>
        <input
          accept=".csv"
          className={classes.input}
          id="contained-button-file"
          type="file"
          name="myfile"
          encType="multipart/form-data"
          onChange={(event) => {
            var file = event.target.files[0];
            if (file.name !== "") {
              const data = new FormData();
              data.append("myfile", file);
              apiManager
                .post("/api/admin/update/upload", data)
                .then((response) => alert("Successful Upload"))
                .catch((e) => alert("Fail to Upload"));
            }
          }}
          style={{
            display: "none",
          }}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload : require a CSV file
          </Button>
        </label>
      </div>
    </div>
  );
};
export default AdminUpdate;
