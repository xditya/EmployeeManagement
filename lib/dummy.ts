// import faker from 'faker';
// import { EmployeeSchema, DepartmentSchema } from './types'; 

// // Generate dummy employee data
// const generateDummyEmployees = (count: number): EmployeeSchema[] => {
//   const employees: EmployeeSchema[] = [];
//   for (let i = 0; i < count; i++) {
//     const employee: EmployeeSchema = {
//       id: i + 1,
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       contactNumber: faker.phone.phoneNumber(),
//       dateOfJoin: faker.date.past().toISOString(),
//       yearsOfExperience: faker.random.number({ min: 0, max: 20 }),
//       departmentId: faker.random.number({ min: 1, max: 5 }), 
//     };
//     employees.push(employee);
//   }
//   return employees;
// };


// const generateDummyDepartments = (): DepartmentSchema[] => {
//   const departments: DepartmentSchema[] = [];
//   for (let i = 0; i < 5; i++) { 
//     const department: DepartmentSchema = {
//       departmentId: i + 1,
//       departmentName: faker.commerce.department(),
//       location: faker.address.city(),
//       managerId: faker.random.number({ min: 1, max: 100 }), 
//     };
//     departments.push(department);
//   }
//   return departments;
// };




// export default {generateDummyDepartments, generateDummyEmployees}
