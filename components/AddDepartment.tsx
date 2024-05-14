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
import { useEffect, useState } from "react";
import {
  createDepartment,
  createEmployee,
  getDepartmentFromId,
  getIdFromDepartment,
} from "@/lib/data";
import { DepartmentSchema, EmployeeSchema } from "@/lib/types";

export default function AddEmployee() {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [managerId, setManagerId] = useState<number>(0);
  const [location, setLocation] = useState("");

  const addDepartment = async (e: any) => {
    e.preventDefault();
    const departmentData = {
      departmentName: departmentName,
      departmentId: departmentId,
      managerId: managerId,
      location: location,
    };
    console.log("Department Data:", departmentData);
    const res = await createDepartment(departmentData as DepartmentSchema);
    if (res) {
      clearStates();
    } else {
      console.log("Error adding Department");
    }
  };

  const clearStates = () => {
    setDepartmentName("");
    setDepartmentId(0);
    setManagerId(0);
    setLocation("");
  };

  // const getId = async (department: string) => {
  //   console.log("Get ID : ", department);
  //   const id = await getIdFromDepartment(department);
  //   console.log("ID : ", id);

  //   return id;
  // };

  // const calculateExperience = (joinDate: string) => {
  //   const today = new Date();
  //   const startDate = new Date(joinDate);
  //   const experienceInMilliseconds: number =
  //     today.getDate() - startDate.getDate();
  //   const years = experienceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
  //   return Math.floor(years);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const department = await getDepartmentFromId(1);
  //     console.log("Department of 1 is :", department);
  //   };

  //   fetchData();
  // });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Department</DialogTitle>
          <DialogDescription>
            Add a new Department to the database. Click Add when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addDepartment}>
          <div className="grid gap-4 py-4">
            {/* Other input fields */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="departmentName" className="text-left">
                Department Name
              </Label>
              <Input
                id="id"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="departmentId" className="text-left">
                Department Id
              </Label>
              <Input
                id="id"
                value={departmentId}
                onChange={(e) => setDepartmentId(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="location" className="text-left">
                Location
              </Label>
              <Input
                id="locatoin"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="managerIdx`" className="text-left">
                Manager Id
              </Label>
              <Input
                id="contact"
                value={managerId}
                onChange={(e) => setManagerId(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add Department</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
