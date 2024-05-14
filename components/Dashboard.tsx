import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DepartmentSchema, EmployeeSchema } from "@/lib/types";
import { getDepartmentFromId, getDepartments, getEmployees } from "@/lib/data";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [employees, setEmployees] = useState<EmployeeSchema[]>([]);
  const [departments, setDepartments] = useState<DepartmentSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEmployees: EmployeeSchema[] = await getEmployees();
        setEmployees(fetchedEmployees);
        const fetchedDepartments: DepartmentSchema[] = await getDepartments();
        setDepartments(fetchedDepartments);
        console.log("Employees:", fetchedEmployees);
        console.log("Departments:", fetchedDepartments);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  // const getDepartment = async (id: number) => {
  //   console.log("Get ID : ", id);
  //   const department = await getDepartmentFromId(id);
  //   console.log("ID : ", id);
  //   return department;
  // };

  const lastFiveEmployees = employees.slice(-5);

  const departmentEmployeeCount: Record<string, number> = {};

  employees.forEach((employee) => {
    const departmentName =
      departments.find((dep) => dep.departmentId === employee.departmentId)
        ?.departmentName || "Unknown";
    departmentEmployeeCount[departmentName] =
      (departmentEmployeeCount[departmentName] || 0) + 1;
  });

  console.log(departmentEmployeeCount);

  const chartData = {
    labels: Object.keys(departmentEmployeeCount),
    datasets: [
      {
        label: "Employee Count per Department",
        data: Object.values(departmentEmployeeCount),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1 className="font-bold text-4xl ml-56 mt-20">Dashboard</h1>
      <div className="grid grid-cols-1 w-4/5 ml-60 mt-10 md:grid-cols-2 grid-rows-2 gap-x-24 gap-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Employee Overview</CardTitle>
            <CardDescription>Employee count per department</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={chartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee and Department Count</CardTitle>
            <CardDescription>
              Total number of employees and departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4  justify-center text-2xl items-center">
              <div>
                <span className="font-bold">Total Employees:</span>{" "}
                {employees.length}
              </div>
              <div>
                <span className="font-bold">Total Departments:</span>{" "}
                {departments.length}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Added Employees</CardTitle>
            <CardDescription>Last 5 employees added</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {lastFiveEmployees.map((employee, index) => (
                <li key={index}>{employee.name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
