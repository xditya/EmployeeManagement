"use client";
import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { Button } from "@/components/ui/button";
import SidebarTab from "./ui/sidebarTab";
import useSidebarStore from "@/store/sideBarStore";
import useSidebarNarrowStore from "@/store/sideBarNarrowStore";
import { BiSolidDashboard } from "react-icons/bi";
import { HiOfficeBuilding } from "react-icons/hi";
import { FaUsers } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

import Link from "next/link";
const Sidebar = () => {
  const { tabSelected, setTabSelected } = useSidebarStore();
  const { isNarrow, setIsNarrow } = useSidebarNarrowStore();
  // const tabs = ["Dashboard", "Employees", "Departments", "Analytics"];
  const tabs = {
    Dashboard: <BiSolidDashboard size={20} />,
    Employees: <FaUsers size={20} />,
    Departments: <HiOfficeBuilding size={20} />,
    Analytics: <SiGoogleanalytics size={20} />,
  };
  const handleTabClick = (tab: string) => {
    console.log("tab ", tab);
    if (tabSelected === tab) return;
    setTabSelected(tab);
    console.log(tabSelected);
  };
  const handleArrowClick = () => {
    setIsNarrow(!isNarrow);
    console.log(isNarrow);
  };
  return (
    <div
      className={`${
        isNarrow ? "w-[8%]" : "w-1/5 p-16"
      } p-24 left-0 absolute top-0 h-full py-10  px-3 border-r border-slate-300 flex flex-col justify-between `}
    >
      <div>
        <div className="flex justify-between items-center pb-6 border-b border-slate-300 px-4">
          {!isNarrow && (
            <span className="text-2xl font-bold uppercase"> emma <br /> <span className="text-sm font-normal capitalize">Employee Management <br /> Made Accessible</span></span>
           
          )}
          <div
            onClick={handleArrowClick}
            className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer"
          >
            {isNarrow ? (
              <RxDoubleArrowRight size={20} />
            ) : (
              <RxDoubleArrowLeft size={20} />
            )}
          </div>
        </div>
        <div className=" flex flex-col py-6 gap-6 px-3">
          {}
          {Object.entries(tabs).map(([tabName, icon], index) => {
            return (
              <div key={index}>
                <Link
                  className={`flex items-center gap-3 rounded-lg ${tabSelected === tabName ? "bg-gray-200 text-gray-900" : "bg-white"} px-3 py-3  transition-all duration-300 ease-in-out hover:text-gray-900 dark:bg-gray-800 text-base font-normal text-gray-500`}
                  href="#"
                  onClick={() => handleTabClick(tabName.toLowerCase())}
                >
                  {icon}
                  {!isNarrow && tabName}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Button className="w-full" variant={"outline"}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

