'use client'; 
import { deleteDepartment, deleteEmployeesInDepartment, getDepartments, updateDepartment } from '@/lib/data';
import { DepartmentSchema, EmployeeSchema } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
const DepartmentList = () => {
  const [departments, setDepartments] = useState<DepartmentSchema[]>([]);
  const [toDelete, setToDelete] = useState(false);
  const [toEdit,setToEdit] = useState(false);
  const [departmentToEdit,setDepartmentToEdit] = useState<DepartmentSchema | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [departmentToDelete, setDepartmentToDelete] =
    useState<DepartmentSchema | null>(null);

  const [departmentName,setDepartmentName] = useState("");
  const [departmentId,setDepartmentId] = useState<number>(0);
  const [managerId,setManagerId] = useState<number>(0);
  const [location,setLocation] = useState("");



  useEffect(() => {
    const fetchDepartments = async () => {
      try {
 
        const fetchedDepartments = await getDepartments();
 
        setDepartments(fetchedDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage((prevPage) => Math.max(1, prevPage + pageNumber));
  };

  const handleDelete = (department : DepartmentSchema) =>{
    
    setToDelete(true);
    setDepartmentToDelete(department);

  }

  const handleEdit = (department : DepartmentSchema)=>{
    console.log("Department to be edited is :",department);
  }

  const deleteSelectedDepartment = async( department : DepartmentSchema)=>{
    console.log("Department to be deleted is : ",department);
    const res = await deleteDepartment(department.departmentId);
    if (res) {
      console.log("Department Deleted");
    } else {
      console.error("Error Deleting Department");
    }
 const result =  await deleteEmployeesInDepartment(department.departmentId);
     if(result){
      console.log("Participants from the department also deleted");
  }else{
    console.log("Uanable to delete Participants");
  }
    setToDelete(false);

  }

  const clearStates = () => {
    setDepartmentId(0);
    setDepartmentName("");
    setLocation("");
    setManagerId(0);
  };
  const updateSelectedEmployee= async (e:any)=>{
    const departmentData : DepartmentSchema ={
      departmentId : departmentId,
      departmentName : departmentName,
      location : location,
      managerId : managerId
    } 

    const res = await updateDepartment(departmentData as DepartmentSchema );
    if (res) {
      console.log("Department Updated");

      clearStates();
      setToEdit(false);
    }else{
      console.log("Department not Updated");
    }

  }
  return (
    <>

    
      {toDelete && departmentToDelete && (
        <AlertDialog open={toDelete} >
          {/* onDismiss={() => setToDelete(false)}> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="text-sm font-semibold text-slate-950">
                  {" "}
                  Department Name :
                  <span className="italic font-medium text-slate-700">
                    {departmentToDelete.departmentName}
                  </span>{" "}
                  <br />
                  Department Id :
                  <span className="italic font-medium text-slate-700">
                    {departmentToDelete.departmentId}
                  </span>{" "}
                  <br />
                </div>
                This action cannot be undone. This will permanently delete the
                Department and remove the Department data from the servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setToDelete(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await deleteSelectedDepartment(departmentToDelete);
                  setToDelete(false);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {toEdit && departmentToEdit && (
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
                  Department ID
                </Label>
                <Input
                  id="id"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Department Name
                </Label>
                <Input
                  id="name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Location
                </Label>
                <Input
                  id="email"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="contact" className="text-left">
            Manager Id
                </Label>
                <Input
                  id="contact"
                  value={managerId}
                  onChange={(e) => setManagerId(parseInt((e.target.value)))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Department</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      )} 

      <Table style={{ height: "400px", overflowY: "scroll" }}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Department ID</TableHead>
            <TableHead>Department Name</TableHead>
            <TableHead>Department Location</TableHead>
            <TableHead className="text-right">Manager Id</TableHead>
            <TableHead className="text-right">Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{department.departmentId}</TableCell>
              <TableCell>{department.departmentName}</TableCell>
              <TableCell>{department.location}</TableCell>
              <TableCell className="text-right">
                {department.managerId}
              </TableCell>
              <TableCell>
                <div className="flex justify-center h-full items-center gap-5">
                  <div
                    onClick = {()=>handleEdit(department)}
                   className="border p-1 rounded-sm hover:bg-slate-100 transition-all duration-300 ease-in-out cursor-pointer">
                    <FiEdit3 size={23} />
                  </div>
                  <div
                    onClick={() => handleDelete(department)}
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

export default DepartmentList;
