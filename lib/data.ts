import { EmployeeSchema, DepartmentSchema } from "./types";

const baseUrl: string = "https://emma.deno.dev/";

async function createEmployee(employee: EmployeeSchema) {
  const url = baseUrl + "createEmployee";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return res.status == 200;
}

async function createEmployees(employees: EmployeeSchema[]) {
  const url = baseUrl + "createEmployees";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employees),
  });
  return res.status == 200;
}

async function getEmployees(): Promise<EmployeeSchema[]> {
  const url = baseUrl + "getEmployees";
  const res = await fetch(url);
  const employees = await res.json();
  employees.sort((a: any, b: any) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
  return employees;
}

async function updateEmployee(employee: EmployeeSchema) {
  const url = baseUrl + "updateEmployee";
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return res.status == 200;
}

async function deleteEmployee(id: number) {
  const url = baseUrl + "deleteEmployee";
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.status == 200;
}

async function createDepartment(department: DepartmentSchema) {
  const url = baseUrl + "createDepartment";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });
  return res.json();
}

async function getDepartments() {
  const url = baseUrl + "getDepartments";
  const res = await fetch(url);
  return res.json();
}

async function updateDepartment(
  departmentId: number,
  departmentName?: string,
  location?: string,
  managerId?: number
) {
  const url = baseUrl + "updateDepartment";
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      departmentId,
      departmentName,
      location,
      managerId,
    }),
  });
  return res.json();
}

async function deleteDepartment(departmentId: number) {
  const url = baseUrl + "deleteDepartment";
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ departmentId }),
  });
  return res.status == 200;
}

async function getDepartmentFromId(departmentId: number) {
  const departments = await getDepartments();
  const matches = departments?.find(
    (department: DepartmentSchema) => department.departmentId === departmentId
  );
  return matches?.departmentName;
}

async function getIdFromDepartment(departmentName: string) {
  const departments = await getDepartments();
  const targetDepartment = departments?.find(
    (department: DepartmentSchema) =>
      department.departmentName == departmentName
  );
  return targetDepartment?.departmentId;
}

export {
  createEmployee,
  createEmployees,
  updateEmployee,
  getEmployees,
  deleteEmployee,
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartmentFromId,
  getIdFromDepartment,
};
