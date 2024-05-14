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
  createEmployee,
  getDepartmentFromId,
  getIdFromDepartment,
} from "@/lib/data";
import { EmployeeSchema } from "@/lib/types";

export function AddEmployee() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeID] = useState<number>();
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [employeeContact, setEmployeeContact] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const addEmployee = async (e: any) => {
    e.preventDefault();
    const employeeData = {
      id: employeeId,
      name: employeeName,
      email: employeeEmail,
      contactNumber: employeeContact,
      dateOfJoin: new Date(joiningDate).toISOString(),
      yearsOfExperience: calculateExperience(joiningDate),
      departmentId: await getId(employeeDepartment),
    };
    console.log("Employee Data:", employeeData);
    const res = await createEmployee(employeeData as EmployeeSchema);
    if (res) {
      clearStates();
    }
  };

  const clearStates = () => {
    setEmployeeName("");
    setEmployeeID(0);
    setEmployeeEmail("");
    setEmployeeContact("");
    setEmployeeDepartment("");
    setJoiningDate("");
  };

  const getId = async (department: string) => {
    console.log("Get ID : ", department);
    const id = await getIdFromDepartment(department);
    console.log("ID : ", id);

    return id;
  };

  const calculateExperience = (joinDate: string) => {
    const today = new Date();
    const startDate = new Date(joinDate);
    const experienceInMilliseconds: number =
      today.getDate() - startDate.getDate();
    const years = experienceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
  };

  useEffect(() => {
    const fetchData = async () => {
      const department = await getDepartmentFromId(1);
      console.log("Department of 1 is :", department);
    };

    fetchData();
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addEmployee}>
          <div className="grid gap-4 py-4">
            {/* Other input fields */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="id" className="text-left">
                Employee ID
              </Label>
              <Input
                id="id"
                value={employeeId}
                onChange={(e) => setEmployeeID(parseInt(e.target.value))}
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
            <Button type="submit">Add Employee</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
