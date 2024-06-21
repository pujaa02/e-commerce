import * as express from "express";
const route = express.Router();
import userauthenticate from "../controller/userauthenticate";
import data from "../controller/fetchproductdata";
import passport from "passport";

route.post("/register", userauthenticate.register);
route.get("/activatecheck/:user_id", userauthenticate.activatecheck);
route.get("/deleteuser/:id", userauthenticate.deleteuser);
route.post("/password/:user_id", userauthenticate.password);
route.get("/checkuser/:email/:pass", userauthenticate.checkuser);
route.get("/finduser/:email", userauthenticate.finduser);
route.get("/user", passport.authenticate("jwt", { session: false }), userauthenticate.getuser)

route.get("/getproductdata", data.getproductData);
route.get("/getcartdata/:id", data.getcartdata);
route.get("/deletecartitem/:user_id/", data.deletecartitem);
route.post("/addtocart/:user_id", data.addtocart)
route.get("/deletefavitem/:user_id/", data.deletefavitem);
route.post("/addtofav/:user_id", data.addtofav);

export default route;
