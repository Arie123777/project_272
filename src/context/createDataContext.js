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

import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};