"use client";

import { createContext, useState } from "react";

const initialValue = {
  isCollapsed: true,
  toggleSidebarcollapse: () => [],
  setclose: () => [],
};

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }) => {
  const [isCollapsed, setCollapse] = useState(true);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  const setClose = (state) => {
    setCollapse(state);
  };

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleSidebarcollapse, setClose }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
