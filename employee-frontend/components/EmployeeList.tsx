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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { deleteEmployee, getDepartmentFromId, getEmployees, getIdFromDepartment, updateEmployee } from "@/lib/data";
import { EmployeeSchema } from "@/lib/types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<EmployeeSchema[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toDelete, setToDelete] = useState(false);
  const [toEdit,setToEdit] = useState(false);
  const [employeeToEdit,setEmployeeToEdit] = useState<EmployeeSchema | null>(null);
  const [employeeToDelete, setEmployeeToDelete] =
    useState<EmployeeSchema | null>(null);
    const [employeeName, setEmployeeName] = useState("");
    const [employeeId, setEmployeeID] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [employeeDepartment, setEmployeeDepartment] = useState("");
    const [employeeContact, setEmployeeContact] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
  

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const fetchedEmployees: EmployeeSchema[] = await getEmployees();
    
        if (isMounted) {
          const updatedEmployees = await Promise.all(
            fetchedEmployees.map(async (employee) => {
              const department = await getDepartmentFromId(employee.departmentId);
              return { ...employee, department };
            })
          );
          setEmployees(updatedEmployees);
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
    const res = await deleteEmployee(Number(employee?.id));
    if (res) {
      console.log("Employee Deleted");
    } else {
      console.error("Error Deleting Employee");
    }
    setToDelete(false);
  };

  const displayedEmployees = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const handleDelete = (employee: EmployeeSchema) => {
    setToDelete(true);
    setEmployeeToDelete(employee);
  };

  const handleEdit = async(employee:EmployeeSchema) =>{
    setToEdit(true);
    setEmployeeToEdit(employee);
    setEmployeeName(employee.name);
    setEmployeeID(employee.id);
    setEmployeeEmail(employee.email);
    setEmployeeContact(employee.contactNumber);
    setEmployeeDepartment(await getDepartment(employee.departmentId));
    // setJoiningDate(employee.dateOfJoin.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }));
    const dateOfJoin = new Date(employee.dateOfJoin); 
    const formattedDateString = dateOfJoin.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
  
    const parts = formattedDateString.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    setJoiningDate(formattedDate); 
  }

  const getDepartment = async (id: number) => {
    console.log("Get ID : ", id);
    const department = await getDepartmentFromId(id);
    console.log("ID : ", id);

    return department;
  };
  const clearStates = () => {
    setEmployeeName("");
    setEmployeeID("");
    setEmployeeEmail("");
    setEmployeeContact("");
    setEmployeeDepartment("");
    setJoiningDate("");
  };
  const updateSelectedEmployee =async (e:any)=>{
    e.preventDefault();
      const employeeData: EmployeeSchema = {
          id: employeeId,
          name: employeeName,
          email: employeeEmail,
          contactNumber: employeeContact,
          dateOfJoin: new Date(joiningDate).toISOString(),
          yearsOfExperience: calculateExperience(joiningDate),
          departmentId: await getId(employeeDepartment),
    };
    const res = await updateEmployee(employeeData);
    if (res) {
      console.log("Employee Updated");

      clearStates();
      setToEdit(false);
    }else{

    }
  }
  const getId = async (department: string) => {
    console.log("Get ID : ", department);
    const id = await getIdFromDepartment(department);
    console.log("ID : ", id);

    return id;
  };

  const calculateExperience = (joinDate: string) => {
    const today:Date = new Date();
    const startDate:Date = new Date(joinDate);
    const experienceInMilliseconds:number = today.getTime() - startDate.getTime();
    const years = experienceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
  };

  return (
    <>
      {toDelete && employeeToDelete && (
        <AlertDialog open={toDelete} >
          {/* onDismiss={() => setToDelete(false)}> */}
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

      {toEdit && employeeToEdit && (
        <Dialog open={toEdit} >
          {/* onDismiss={() => setToEdit(false)} > */}

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Employee</DialogTitle>
            <DialogDescription>
              Make changes to the Employee Data here. Click update when done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={updateSelectedEmployee}>
            <div className="grid gap-4 py-4">
              {/* Other input fields */}
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="id" className="text-left">
                  Employee ID
                </Label>
                <Input
                  id="id"
                  value={employeeId}
                  onChange={(e) => setEmployeeID(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Employee Name
                </Label>
                <Input
                  id="name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  id="email"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="contact" className="text-left">
                  Contact Number
                </Label>
                <Input
                  id="contact"
                  value={employeeContact}
                  onChange={(e) => setEmployeeContact(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="joiningDate" className="text-left">
                  Joining Date
                </Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="department" className="text-left">
                  Department
                </Label>
                <Select
                  value={employeeDepartment}
                  onValueChange={(value) => setEmployeeDepartment(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departments</SelectLabel>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Customer Service">
                        Customer Service
                      </SelectItem>
                      <SelectItem value="10">Engineering</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Employee</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
                  <div
                    onClick = {()=>handleEdit(employee)}
                   className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer">
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
