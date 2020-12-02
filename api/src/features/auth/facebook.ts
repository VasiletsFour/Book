// import passport from "passport"
// import * as conf from "../../config/config";
// import strategy from "passport-facebook";
// import User from "../shared/db-models/user-models";

// const fbId = String(conf.arr[3])
// const fbSecret = String(conf.arr[4])
// const callBack = String(conf.arr[5])
// const FacebookStrategy = strategy.Strategy

// passport.serializeUser(function (user, done) {
//     done(null, user)
// })

// passport.deserializeUser(function (obj, done) {
//     done(null, obj)
// })

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: fbId,
//             clientSecret: fbSecret,
//             callbackURL: callBack,
//             profileFields: ["email", "name"]
//         },
//         function (accessToken, refreshToken, profile, done) {
//             const { email, first_name } = profile._json
//             const userData = new User({
//                 username: first_name,
//                 email: email,
//                 password: "",
//                 role: "user"
//             });
//             const savedFb = userData.save()
//             console.log(savedFb)
//         })
// )