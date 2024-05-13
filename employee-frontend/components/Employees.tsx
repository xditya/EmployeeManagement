import React from "react";
import { Button } from "./ui/button";
import { AddEmployee } from "./AddEmployee";
import { AddCSVEmployee } from "./AddCSVEmployee";
import EmployeeList from "./EmployeeList";

const Employees = () => {
  return (
    <div className="w- h-full ">
      <h1>Employee</h1>
      <AddEmployee />
      <AddCSVEmployee />
      <EmployeeList />
    </div>
  );
};

export default Employees;
