interface EmployeeSchema {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  dateOfJoin: string;
  yearsOfExperience: number;
  departmentId: number;
  department?: string;
}

interface DepartmentSchema {
  departmentId: number;
  departmentName: string;
  location: string;
  managerId: number;
}

export type { EmployeeSchema, DepartmentSchema };
