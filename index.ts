import { Application, Router } from "oak";
import { createEmployee, getEmployees } from "./database/employeeDb.ts";
import { deleteEmployee } from "./database/employeeDb.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.redirect("https://www.google.com");
});

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
