import passport from "passport";
import { Strategy as GithubStrategy, Profile } from "passport-github";
import AuthService from "../api/services/auth.service";
import l from "../common/logger";

export default () => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:${
          process.env.PORT
        }/api/v1/oauth/github/callback`,
        scope: ["repo:status"]
      },
      (accessToken: string, refreshToken: string, profile: Profile, done) => {
        l.info(`tokens: [access: ${accessToken}, refresh: ${refreshToken}]`);
        l.info(`Username: ${profile.username}`);
        l.info(profile);
        AuthService.findAndUpdateUser(profile, accessToken)
          .then(() => done(null, profile))
          .catch(() => l.error("Error while OAuth and finding user"));
      }
    )
  );
};
