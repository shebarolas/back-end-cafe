const { request } = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/usuario');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET_ID,
    callbackURL: "http://localhost:7000/auth/usuarios/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

      const usuerFound = await Usuario.findOne({
        email: profile.emails[0].value,
        google: true
      });
      
      const datos = profile._json;

      console.log(datos);

      if(!usuerFound){
        const usuario = new Usuario({

          nombre: datos.given_name,
          email: datos.email,
          password: ':P',
          image: datos.picture,
          google: true,
          estado: datos.email_verified

        });

        const userSave = await usuario.save();

        return cb(null, userSave);
      }

      return cb(null, usuerFound);
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

