import React from "react";
import { Button } from "./ui/button";
import { AddEmployee } from "./AddEmployee";
import { AddCSVEmployee } from "./AddCSVEmployee";
import EmployeeList from "./EmployeeList";

const Employees = () => {
  return (
    <div className="w-5/6 px-20 mx-32  h-full ">
      <h1 className="font-bold text-3xl my-2">Employee</h1>
      <AddEmployee />
      <AddCSVEmployee />
      <EmployeeList />
    </div>
  );
};

export default Employees;
