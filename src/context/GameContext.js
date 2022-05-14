/*
 * CSCI2720 Course Project
 * Car Park Finder
 *
 * Copyright (c) 2020
 * @author Leong Chon Hou 1155113489
 * @author Yeung Man Wai 1155126854
 * @author Cheng Kit Wai 1155133186
 * @author Leung Wang Fat 1155093445
 */

import createDataContext from './createDataContext';
import apiManager from "../api/apiManager";

const gameReducer = (state, action) => {
  switch (action.type) {
    case "fetch_parks":
      return { ...state, parks: action.payload }
    case "write_home_location":
      return { ...state, homeLocation: action.payload }
    default:
      return state;
  }
};

const fetch_parks = dispatch => async (latitude, longitude) => {
  try {
    const response = await apiManager.get("/api/user/list/park", {
      params: {
        latitude,
        longitude
      }
    });
    // console.log(response.data.token);
    if (response.data) {
      dispatch({ type: "fetch_parks", payload: response.data });
    }
  } catch (e) {
    console.error(e)
  }
}

const fetchHomeLocation = dispatch => async () => {
  await apiManager.get('/api/user/longlat')
    .then(response => {
      if ("latitude" in response.data && "longitude" in response.data) {
        dispatch({ type: "write_home_location", payload: [response.data.latitude, response.data.longitude] });
      }
    })

}

const setHomeLocation = dispatch => async (coordinate) => {
  await apiManager.patch('/api/user/longlat', {
      latitude: coordinate[0],
      longitude: coordinate[1]
  }).catch(e => console.log(e.response))
  dispatch({ type: "write_home_location", payload: coordinate });
}

export const { Provider, Context } = createDataContext(
  gameReducer,
  { fetch_parks, fetchHomeLocation, setHomeLocation },
  { parks: null, homeLocation: [22.419511073104125, 114.2063355445862] }
);