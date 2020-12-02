import { Router } from "express";
import { signup, signin, profile } from "./auth.controllers";
import { tokenValidation } from "./verifyToken";
import passport from "passport";
import * as pf from "passport-facebook";
import * as conf from "../../config/config";

const router: Router = Router()

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', tokenValidation, profile);



// const fbId = String(conf.arr[3])
// const fbSecret = String(conf.arr[4])
// const callBack = String(conf.arr[5])
// const facebookStrategy = pf.Strategy


// passport.use(
//     new facebookStrategy(
//         {
//             clientID: fbId,
//             clientSecret: fbSecret,
//             callbackURL: callBack,
//             profileFields: ["email", "name"]
//         },
//         function (accessToken: any, refreshToken: any, profile: any, cb: any) {

//             return cb(null, profile);
//         }));




// router.get('/facebook', passport.authenticate("facebook"))
// router.get(
//     "/auth/facebook/callback",
//     passport.authenticate("facebook", {
//         successRedirect: "/notFail",
//         failureRedirect: "/fail"
//     })
// );
// router.get("/fail", (req, res) => {
//     res.send("Failed attempt");
// });

// router.get("/notFail", (req, res) => {
//     res.send("Success");
// });

export default router