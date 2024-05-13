import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { deleteEmployee, getDepartmentFromId, getEmployees } from "@/lib/data";
import { EmployeeSchema } from "@/lib/types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<EmployeeSchema[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toDelete, setToDelete] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] =
    useState<EmployeeSchema | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const fetchedEmployees: EmployeeSchema[] = await getEmployees();

        if (isMounted) {
          setEmployees(
            fetchedEmployees.map((employee) => {
              const updatedEmployee = {
                ...employee,
                department: getDepartmentFromId(employee.departmentId),
              };
              return updatedEmployee;
            }),
          );
        }

        console.log("Employees:", fetchedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage((prevPage) => Math.max(1, prevPage + pageNumber));
  };

  const deleteSelectedEmployee = async (employee: EmployeeSchema) => {
    console.log("Employee to be deleted is :", employee);
    const res = await deleteEmployee(employee?.id);
    if (res) {
      console.log("Employee Deleted");
    } else {
      console.error("Error Deleting Employee");
    }
  };

  const displayedEmployees = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const handleDelete = (employee: EmployeeSchema) => {
    setToDelete(true);
    setEmployeeToDelete(employee);
  };

  return (
    <>
      {toDelete && employeeToDelete && (
        <AlertDialog open={toDelete} onDismiss={() => setToDelete(false)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="text-sm font-semibold text-slate-950">
                  {" "}
                  Employee Name :{" "}
                  <span className="italic font-medium text-slate-700">
                    {employeeToDelete.name}
                  </span>{" "}
                  <br />
                  Employee Id :{" "}
                  <span className="italic font-medium text-slate-700">
                    {employeeToDelete.id}
                  </span>{" "}
                  <br />
                </div>
                This action cannot be undone. This will permanently delete the
                Employee and remove his/her data from the servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setToDelete(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await deleteSelectedEmployee(employeeToDelete);
                  setToDelete(false);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Table style={{ height: "400px", overflowY: "scroll" }}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Employee ID</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Years Of Experience</TableHead>
            <TableHead className="text-right">Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedEmployees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell className="text-right">
                {employee.yearsOfExperience}
              </TableCell>
              <TableCell>
                <div className="flex justify-center h-full items-center gap-5">
                  <div className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer">
                    <FiEdit3 size={23} />
                  </div>
                  <div
                    onClick={() => handleDelete(employee)}
                    className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <MdOutlineDelete size={23} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <div className="flex justify-center items-center gap-5">
          <div
            onClick={() => handlePageChange(-1)}
            className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <FaAngleLeft size={22} />
          </div>
          <div
            onClick={() => handlePageChange(1)}
            className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <FaAngleRight size={22} />
          </div>
        </div>
      </Table>
    </>
  );
};

export default EmployeeList;
