const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api/api");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const session = require("express-session");
const Connect = require("express-mysql-session");
const AdminJSSequelize = require("@adminjs/sequelize");
const usersModel = require("./models/users");
const tokensModel = require("./models/tokens");
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

const start = async () => {
  app.use(express.static(path.join(pth)));
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api", apiRouter);
  const adminOptions = {
    // We pass Category to `resources`
    resources: [usersModel, tokensModel],
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
  console.log(admin.options.rootPath);
  app.get("*", (req, res) => {
    res.sendFile(path.join(pth, "index.html"));
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
start();
