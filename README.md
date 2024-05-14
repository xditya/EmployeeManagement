# REST API

## EndPoints

### Employees
- /createEmployee [`POST`]
  - id
  - name
  - email
  - contactNumber
  - dateOfJoin
  - yearsOfExperience
  - departmentId
- /createEmployees [`POST`]
  - employees (array of employees)
    - id
    - name
    - email
    - contactNumber
    - dateOfJoin
    - yearsOfExperience
    - departmentId
- /getEmployees [`GET`]
- /deleteEmployee [`DELETE`]
  - id
- /updateEmployee [`PUT`]
  - id
  - name (optional)
  - email (optional)
  - contactNumber (optional)
  - dateOfJoin (optional)
  - yearsOfExperience (optional)
  - departmentId (optional)

### Departments
- /createDepartment [`POST`]
  - departmentId
  - departmentName
  - location
  - managerId
- /getDepartments [`GET`]
- /deleteDepartment [`DELETE`]
  - departmentId
- /updateDepartment [`PUT`]
  - departmentId
  - departmentName (optional)
  - location (optional)
  - managerId (optional)

### Extras
- /promotable [`GET`]
- /deleteEmployeesInDepartment [`DELETE`]
  - departmentId