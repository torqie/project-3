const User = require('../models/user.model');
const GithubStrategy = require('passport-github');


module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log("Deserializing");
    User.findById(id).then(user => {
      console.log("deser results:", user);
      done(null, user)
    }).catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
  });
  passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
      },
      async(accessToken, refreshToken, profile, cb) => {
        // Find the current user in the User Model
        const currentUser = await User.findOne({
          'github.id': profile._json.id
        });
        // Create new user if the database doesnt have the current user.
        if(!currentUser) {
          const newUser = await new User({
            name: profile._json.name,
            login: profile._json.login,
            avatar: profile._json.avatar_url,
            provider: 'github',
            github: profile._json
          }).save();
          if(newUser) {
            return cb(null, newUser)
          }
        }
        return cb(null, currentUser)
      }));
};

