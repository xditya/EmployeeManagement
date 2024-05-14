import React from "react";
import AddDepartment from "./AddDepartment";
import DepartmentList from "./DepartmentList";

const Departments = () => {
  return (
    <div className="w-5/6 px-20 mx-32  h-full ">
      <h1 className="font-bold text-4xl my-5">Departments</h1>
      <AddDepartment />
      <DepartmentList />
    </div>
  );
};

export default Departments;
