import React from "react";
import { Button } from "./ui/button";
import { AddEmployee } from "./AddEmployee";
import { AddCSVEmployee } from "./AddCSVEmployee";
import EmployeeList from "./EmployeeList";
import PromotionList from "./PromotionList";

const Employees = () => {
  return (
    <div className="w-5/6 px-20 mx-32  h-full ">
      <h1 className="font-bold text-3xl my-2">Employee</h1>
      <AddEmployee />
      <AddCSVEmployee />
      <EmployeeList />
      <h1 className="font-bold text-3xl mt-10">Promoted List</h1>
      <PromotionList/>
    </div>
  );
};

export default Employees;
