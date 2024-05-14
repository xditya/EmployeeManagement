"use client";
import React from "react";
import useSidebarStore from "@/store/sideBarStore";
import useSidebarNarrowStore from "@/store/sideBarNarrowStore";
import Dashboard from "./Dashboard";
import Employees from "./Employees";
import Departments from "./Departments";
import Analytics from "./Analytics";

const MainDisplay = () => {
  const { isNarrow, setIsNarrow } = useSidebarNarrowStore();

  const { tabSelected } = useSidebarStore();

  let displayContent;
  switch (tabSelected) {
    case "dashboard":
      displayContent = <Dashboard/>;
      break;
    case "employees":
      displayContent = <Employees />;
      break;
    case "departments":
      displayContent = <Departments />;
      break;
    case "analytics":
      displayContent = <Analytics />;
      break;
    default:
      displayContent = ``;
  }
  return (
    <div className={` ${isNarrow ? "w-[92%]" : "w-4/5"}  mx-20 h-full  `}>
      {displayContent}
    </div>
  );
};

export default MainDisplay;
