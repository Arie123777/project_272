/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yahui 1155143159
 * Fan Dezen 1155143810
 */

import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import apiManager from "../../api/apiManager";

const Cells = [
  {
    field: "user_id",
    title: "User ID",
    width: "20%",
    type: "numeric",
    editable: "never",
  },
  { field: "name", title: "User Name", width: "35%" },
  { field: "password", title: "Hashed Password", width: "35%" },
];

const AdminUserCRUD = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [DataInTable, setData] = useState({
    columns: Cells,
    data: [],
  });

  useEffect(() => {
    (async () => {
      apiManager
        .get("/api/admin/manage/user")
        .then((res) => {
          setData((state) => ({ ...state, data: res.data }));
        })
        .catch((e) => alert("Fetch user : Error"));
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <MaterialTable
        title="User CRUD"
        columns={DataInTable.columns}
        data={DataInTable.data}
        isLoading={isLoading}
        double_comfirm={{
          body: { editRow: { deleteText: "Delete message?" } },
        }}
        editable={{
          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (newData.pw !== undefined && newData.name !== undefined) {
                  var count = 0;
                  if (newData.name.length < 4 || newData.name.length > 20) {
                    alert("Invalid Username : must within 4-20 characters");
                    count = 1;
                  }
                  if (newData.pw.length < 4 || newData.pw.length > 20) {
                    alert("Invalid Password : must within 4-20 characters");
                    count = 1;
                  }
                  if (count === 1) {
                    resolve();
                    return;
                  } else {
                    apiManager
                      .request({
                        method: "post",
                        url: "api/admin/manage/user",
                        data: {
                          name: newData.name,
                          pw: newData.pw,
                        },
                      })
                      .catch((e) => {
                        alert(JSON.stringify(e.response.data));
                        resolve();
                      })
                      .then(async () => {
                        apiManager
                          .get("/api/admin/manage/user")
                          .then((res) => {
                            setData((state) => ({
                              ...state,
                              data: res.data,
                            }));
                            resolve();
                          })
                          .catch((e) => alert("Fetching users : Error"));
                      })
                      .catch(() => {
                        alert("Creating new user : Error");
                        resolve();
                      });
                  }
                } else {
                  alert("Some fields are missing. Please fill in all of them");
                  resolve();
                  return;
                }
              }, 600);
            });
          },
          onRowUpdate: (newData, PreviousData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (PreviousData !== newData) {
                  var count = 0;
                  if (
                    newData.name !== PreviousData.name &&
                    (newData.name.length < 4 || newData.name.length > 20)
                  ) {
                    alert("Invalid Username : must within 4-20 characters");
                    count = 1;
                  }
                  if (
                    newData.pw !== PreviousData.pw &&
                    (newData.pw.length < 4 || newData.pw.length > 20)
                  ) {
                    alert("Invalid Password : must within 4-20 characters");
                    count = 1;
                  }
                  if (count === 1) {
                    resolve();
                    return;
                  } else {
                    apiManager
                      .request({
                        method: "patch",
                        url: "api/admin/manage/user",
                        data: {
                          user_id: newData.user_id,
                          name: newData.name,
                          pw: newData.pw,
                        },
                      })
                      .then(async () => {
                        apiManager
                          .get("/api/admin/manage/user")
                          .then((res) => {
                            setData((state) => ({
                              ...state,
                              data: res.data,
                            }));
                            resolve();
                          })
                          .catch((e) => alert("Fetching users : Error"));
                      })
                      .catch(() => {
                        alert("Updating user : Error");
                        resolve();
                      });
                  }
                }
              }, 600);
            });
          },
          onRowDelete: (PreviousData) =>
            apiManager
              .request({
                method: "delete",
                url: "api/admin/manage/user",
                data: {
                  user_id: PreviousData.user_id,
                },
              })
              .then(async () => {
                apiManager
                  .get("/api/admin/manage/user")
                  .then((res) => {
                    setData((state) => ({ ...state, data: res.data }));
                  })
                  .catch((e) => alert("Fetching users : Error"));
              })
              .catch(() => {
                alert("Removing user : Error");
              }),
        }}
      />
    </>
  );
};

export default AdminUserCRUD;
