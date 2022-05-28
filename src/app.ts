import express from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import cors from "cors";
import {
  MONGODB_URI as mongoUrl,
  SESSION_SECRET as secret,
} from "./util/secrets";

import * as homeController from "./controllers/home";
import * as elementController from "./controllers/element";
import * as elementsController from "./controllers/elements";

const app = express();
mongoose.Promise = bluebird;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to mongoDB!");
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    // process.exit();
  });

const portNumber = Number(process.env.PORT || "3000");
app.set("port", portNumber);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret,
    store: new MongoStore({ mongoUrl }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get("/element/:e", elementController.index);
app.post("/element/:e", elementController.postIndex);
app.put("/element/:e", elementController.putIndex);
app.delete("/element/:e", elementController.deleteIndex);
app.get("/elements", elementsController.index);


export default app;
