import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import session from "express-session";
import Connect from "express-mysql-session";
import AdminJSSequelize from "@adminjs/sequelize";
import * as url from "url";
import apiRouter from "./routes/api/api.js";
import usersModel from "./models/users.js";
import tokensModel from "./models/tokens.js";
import productsModel from "./models/products.js";

const app = express();
const port = 3000;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

const pth = path.join(path.dirname(__dirname), "client");

const DEFAULT_ADMIN = {
  email: "israilbutdayev@gmail.com",
  password: "0000",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

app.use(express.static(path.join(pth, "static")));
app.use(express.json());
app.use(cookieParser());

const adminOptions = {
  // We pass Category to `resources`
  resources: [productsModel, usersModel, tokensModel],
};
const admin = new AdminJS(adminOptions);

const ConnectSession = Connect(session);
const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "final_project",
};
const sessionStore = new ConnectSession(options);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret",
  },
  null,
  {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: "sessionsecret",
    cookie: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    },
    name: "adminjs",
  }
);
app.use(admin.options.rootPath, adminRouter);
// adminJS.watch();
app.use("/api", apiRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(pth, "index.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
