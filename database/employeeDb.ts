import { db } from "./connect.ts";

interface Employee {
  id: number;
  name: string;
  email: string;
  contactNumber: number;
  dateOfJoin: Date;
  yearsOfExperience: number;
  departmentId: number;
}

const employeeDb = db.collection<Employee>("employees");

// create
async function createEmployee(
  id: number,
  name: string,
  email: string,
  contactNumber: number,
  dateOfJoin: Date,
  yearsOfExperience: number,
  departmentId: number
) {
  if (await employeeDb.findOne({ id })) {
    throw new Error("Employee already exists");
  }
  await employeeDb.insertOne({
    id,
    name,
    email,
    contactNumber,
    dateOfJoin,
    yearsOfExperience,
    departmentId,
  });
}

// read
async function getEmployees() {
  return await employeeDb.find({}).toArray();
}

// update
async function updateEmployee(
  id: number,
  name?: string,
  email?: string,
  contactNumber?: number,
  dateOfJoin?: Date,
  yearsOfExperience?: number,
  departmentId?: number
) {
  if (!(await employeeDb.findOne({ id })))
    throw new Error("Employee does not exist");
  await employeeDb.updateOne(
    { id },
    {
      $set: {
        name,
        email,
        contactNumber,
        dateOfJoin,
        yearsOfExperience,
        departmentId,
      },
    }
  );
}

// delete
async function deleteEmployee(id: number) {
  if (!(await employeeDb.findOne({ id })))
    throw new Error("Employee does not exist");
  await employeeDb.deleteOne({ id });
}

export { createEmployee, getEmployees, updateEmployee, deleteEmployee };
