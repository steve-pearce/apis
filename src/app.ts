import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import cors from 'cors';
import { MONGODB_URI as mongoUrl, SESSION_SECRET as secret } from "./util/secrets";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as elementController from "./controllers/element";
import * as propController from "./controllers/prop";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";
// console.log(colorArray.length)

// Create Express server
const app = express();
mongoose.Promise = bluebird;
mongoose.connect(mongoUrl).then(
    () => {
        console.log("Connected to mongoDB!")
     },
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret,
    store: new MongoStore({ mongoUrl })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors())
// res.header('Access-Control-Allow-Origin', '*');
// res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// app.use((req: { user: any; }, res: { locals: { user: any; }; }, next: () => any) => {
//     res.locals.user = req.user;
//     next();
// });
// app.use((req: { user: any; path: string; session: { returnTo: any; }; }, res: any, next: () => any) => {
//     // After successful login, redirect back to the intended page
//     if (!req.user &&
//     req.path !== "/login" &&
//     req.path !== "/signup" &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)) {
//         req.session.returnTo = req.path;
//     } else if (req.user &&
//     req.path == "/account") {
//         req.session.returnTo = req.path;
//     }
//     next();
// });

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get("/element/:e", elementController.index);
app.get("/prop/:e", propController.index);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
app.get("/forgot", userController.getForgot);
app.post("/forgot", userController.postForgot);
app.get("/reset/:token", userController.getReset);
app.post("/reset/:token", userController.postReset);
app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req: { session: { returnTo: any; }; }, res: { redirect: (arg0: any) => void; }) => {
//     res.redirect(req.session.returnTo || "/");
// });

export default app;


