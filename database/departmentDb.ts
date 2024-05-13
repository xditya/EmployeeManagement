import { db } from "./connect.ts";

interface DepartmentSchema {
  departmentId: number;
  departmentName: string;
  location: string;
  managerId: number;
}

const departmentDb = db.collection<DepartmentSchema>("department");

async function createDepartment(
  departmentId: number,
  departmentName: string,
  location: string,
  managerId: number
) {
  if (!(await departmentDb.findOne({ departmentId }))) {
    await departmentDb.insertOne({
      departmentId,
      departmentName,
      location,
      managerId,
    });
  } else {
    throw new Error("Department already exists");
  }
}

async function getDepartments() {
  return await departmentDb.find({}).toArray();
}

async function updateDepartment(
  departmentId: number,
  departmentName?: string,
  location?: string,
  managerId?: number
) {
  if (!(await departmentDb.findOne({ departmentId }))) {
    throw new Error("Department does not exist");
  }

  if (departmentName) {
    await departmentDb.updateOne(
      { departmentId },
      { $set: { departmentName } }
    );
  }

  if (location) {
    await departmentDb.updateOne({ departmentId }, { $set: { location } });
  }

  if (managerId) {
    await departmentDb.updateOne({ departmentId }, { $set: { managerId } });
  }
}

async function deleteDepartment(departmentId: number) {
  if (
    !(await departmentDb.findOne({
      departmentId,
    }))
  ) {
    throw new Error("Department does not exist");
  }
  await departmentDb.deleteOne({ departmentId });
}

export { createDepartment, getDepartments, updateDepartment, deleteDepartment };
