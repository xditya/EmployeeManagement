import React, { useEffect, useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import { DepartmentSchema, EmployeeSchema } from "@/lib/types";
import { getDepartmentFromId, getDepartments, getEmployees } from "@/lib/data";

const Analytics = () => {
 const [employees,setEmployees] = useState<EmployeeSchema[]>([]);
 const [departments,setDepartments] = useState<DepartmentSchema[]>([])
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      const fetchedEmployees: EmployeeSchema[] = await getEmployees();
      setEmployees(fetchedEmployees)
      const fetchedDepartments :DepartmentSchema[] = await getDepartments();
      setDepartments(fetchedDepartments)
      console.log("Employees:", fetchedEmployees);
      console.log("Departments:",fetchedDepartments)
    } catch (error) {
      console.error("Error fetching :", error);
      
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);
  return <div className="w-5/6 px-20 mx-32  h-full ">
  <h1 className="font-bold text-4xl my-5">Analytics</h1>
  <AnalyticsChart employees={employees} departments={departments}/>
  {/* <DepartmentList /> */}
</div>
};

export default Analytics;
