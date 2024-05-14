import { Application, Router } from "oak";
import {
  type Employee,
  createEmployee,
  createEmployees,
  getEmployees,
  updateEmployee,
} from "./database/employeeDb.ts";
import { deleteEmployee } from "./database/employeeDb.ts";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "./database/departmentDb.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.redirect("https://www.google.com");
});

// employees

router.post("/createEmployee", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    await createEmployee(
      body.id,
      body.name,
      body.email,
      body.contactNumber,
      body.dateOfJoin,
      body.yearsOfExperience,
      body.departmentId
    );
    ctx.response.status = 200;
    ctx.response.body = "Success";
  } catch (e) {
    console.log(e.message);
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

router.post("/createEmployees", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    await createEmployees(body);
    ctx.response.status = 200;
    ctx.response.body = "Success";
  } catch (e) {
    console.log(e.message);
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

router.get("/getEmployees", async (ctx) => {
  const employees = await getEmployees();
  ctx.response.body = employees;
  return (ctx.response.status = 200);
});

router.delete("/deleteEmployee", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    await deleteEmployee(body.id);
    return (ctx.response.status = 200);
  } catch (e) {
    console.log(e.message);
    ctx.response.status = 400;
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

router.put("/updateEmployee", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    await updateEmployee(
      body.id,
      body.name,
      body.email,
      body.contactNumber,
      body.dateOfJoin,
      body.yearsOfExperience,
      body.departmentId
    );
    ctx.response.body = "Success";
    return (ctx.response.status = 200);
  } catch (e) {
    console.log(e.message);
    ctx.response.status = 400;
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

// departments

router.post("/createDepartment", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    await createDepartment(
      body.departmentId,
      body.departmentName,
      body.location,
      body.managerId
    );
    ctx.response.status = 200;
    ctx.response.body = "Success";
  } catch (e) {
    console.log(e.message);
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

router.get("/getDepartments", async (ctx) => {
  const departments = await getDepartments();
  ctx.response.body = departments;
  return (ctx.response.status = 200);
});

router.put("/updateDepartment", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    await updateDepartment(
      body.departmentId,
      body.departmentName,
      body.location,
      body.managerId
    );
    ctx.response.body = "Success";
    return (ctx.response.status = 200);
  } catch (e) {
    console.log(e.message);
    ctx.response.status = 400;
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

router.delete("/deleteDepartment", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    await deleteDepartment(JSON.parse(body).departmentId);
    return (ctx.response.status = 200);
  } catch (e) {
    console.log(e.message);
    ctx.response.status = 400;
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

router.delete("/deleteEmployeesInDepartment", async (ctx) => {
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request: Body is missing";
    return;
  }
  try {
    const employees = await getEmployees();
    const newEmployees = employees.filter(
      (employee) => employee.departmentId === JSON.parse(body).departmentId
    );
    for (const employee of newEmployees) {
      await deleteEmployee(employee.id);
    }
    return (ctx.response.status = 200);
  } catch (e) {
    console.log(e.message);
    ctx.response.status = 400;
    return (ctx.response.body = {
      error: e.message,
    });
  }
});

// promotion
router.get("/promotable", async (ctx) => {
  const employees = await getEmployees();
  const currentDate = new Date().getFullYear();
  const promotable: Employee[] = [];
  for (const employee of employees) {
    if (currentDate - new Date(employee.dateOfJoin).getFullYear() > 5) {
      promotable.push(employee);
    }
  }
  ctx.response.status = 200;
  ctx.response.body = promotable;
});

const app = new Application();
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("error", (e) => console.log(e));

console.log("> Started listeneing on PORT 8000!");

await app.listen({ port: 8000 });
