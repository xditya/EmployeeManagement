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

// multiple create
async function createEmployees(employees: any[]) {
  for (const employee of employees) {
    await createEmployee(
      employee.id,
      employee.name,
      employee.email,
      employee.contactNumber,
      employee.dateOfJoin,
      employee.yearsOfExperience,
      employee.departmentId
    );
  }
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
  if (name)
    await employeeDb.updateOne(
      { id },
      {
        $set: {
          name,
        },
      }
    );
  if (email)
    await employeeDb.updateOne(
      { id },
      {
        $set: {
          email,
        },
      }
    );
  if (contactNumber)
    await employeeDb.updateOne(
      { id },
      {
        $set: {
          contactNumber,
        },
      }
    );

  if (dateOfJoin)
    await employeeDb.updateOne(
      { id },
      {
        $set: {
          dateOfJoin,
        },
      }
    );

  if (yearsOfExperience)
    await employeeDb.updateOne(
      { id },
      {
        $set: {
          yearsOfExperience,
        },
      }
    );

  if (departmentId)
    await employeeDb.updateOne(
      { id },
      {
        $set: {
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

export {
  createEmployee,
  createEmployees,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
