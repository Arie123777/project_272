/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 */

import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import apiManager from "../../api/apiManager";

const Cells = [
  {
    field: "loc_id",
    title: "ID",
    width: "5%",
    type: "numeric",
    editable: "never",
  },
  { field: "name", title: "Location Name", width: "35%" },
  { field: "latitude", title: "Latitude", type: "numeric" },
  { field: "longitude", title: "Longtitude", type: "numeric" },
  {
    field: "opening_status",
    title: "Status",
    lookup: { true: "Open", false: "Closed" },
    width: "5%",
  },
  { field: "address", title: "Address", width: "50%" },
];

const AdminLocCRUD = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState({
    columns: Cells,
    data: [],
  });

  useEffect(() => {
    (async () => {
      apiManager
        .get("/api/admin/manage/loaction")
        .then((res) => {
          setTableData((state) => ({ ...state, data: res.data }));
        })
        .catch((e) => alert("Fetching location information : Error"));
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <MaterialTable
        title="Location CRUD"
        columns={tableData.columns}
        data={tableData.data}
        isLoading={isLoading}
        double_comfirm={{
          body: { editRow: { deleteText: "Delete message?" } },
        }}
        editable={{
          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (
                  newData.name !== undefined &&
                  newData.latitude !== undefined &&
                  newData.longitude !== undefined &&
                  newData.address !== undefined &&
                  newData.opening_status !== undefined
                ) {
                  apiManager
                    .request({
                      method: "post",
                      url: "api/admin/manage/location",
                      data: {
                        name: newData.name,
                        latitude: newData.latitude,
                        longitude: newData.longitude,
                        address: newData.address,
                        opening_status: newData.opening_status,
                      },
                    })
                    .then(async () => {
                      apiManager
                        .get("/api/admin/manage/location")
                        .then((res) => {
                          setTableData((state) => ({
                            ...state,
                            data: res.data,
                          }));
                          resolve();
                        })
                        .catch((e) => alert("Fetching locations : Error"));
                    })
                    .catch(() => {
                      alert("Adding location : Error");
                      resolve();
                    });
                } else {
                  alert("Some fields are missing. Please fill in all of them");
                  resolve();
                  return;
                }
              }, 600);
            });
          },
          onRowUpdate: (newData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                apiManager
                  .request({
                    method: "patch",
                    url: "api/admin/manage/location",
                    data: {
                      loc_id: newData.loc_id,
                      name: newData.name,
                      latitude: newData.latitude,
                      longitude: newData.longitude,
                      address: newData.address,
                      opening_status: newData.opening_status,
                    },
                  })
                  .catch((e) => {
                    alert(JSON.stringify(e.response.data));
                    resolve();
                  })
                  .then(async () => {
                    apiManager
                      .get("/api/admin/manage/location")
                      .then((res) => {
                        setTableData((state) => ({
                          ...state,
                          data: res.data,
                        }));
                        resolve();
                      })
                      .catch((e) => alert("Fetching locations : Error"));
                  })
                  .catch(() => {
                    alert("Adding location : Error");
                    resolve();
                  });
              }, 600);
            });
          },
          onRowDelete: (oldData) =>
            apiManager
              .request({
                method: "delete",
                url: "api/admin/manage/location",
                data: {
                  loc_id: oldData.loc_id,
                },
              })
              .then(async () => {
                apiManager
                  .get("/api/admin/manage/location")
                  .then((res) => {
                    setTableData((state) => ({ ...state, data: res.data }));
                  })
                  .catch((e) => alert("Fetching locations : Error"));
              })
              .catch(() => {
                alert("Removing location : Error");
              }),
        }}
      />
    </>
  );
};

export default AdminLocCRUD;
