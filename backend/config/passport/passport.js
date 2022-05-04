const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcryptjs = require('bcryptjs');
const User = require('../../models/UserModel');

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.SECRET,
};

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//token local
passport.use(
    new Strategy(opts, (jwt_payload, done) => {
        User.findOne(
            {
                _id: jwt_payload._id,
            },
            (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }
        );
    })
);

//token Google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/user/login-google/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            const getUser = await User.findOne({
                googleId: profile.id,
            });

            if (getUser) {
                var user = {
                    _id: getUser._id,
                    firstName: getUser.firstName,
                    lastName: getUser.lastName,
                    email: getUser.email,
                    role: getUser.role,
                    sex: getUser.sex,
                    phone: getUser.phone,
                    address: getUser.address,
                    googleId: getUser.googleId,
                    provider: getUser.provider,
                    token: accessToken,
                    avatar: profile.photos[0].value,
                };
                done(null, {
                    info: user,
                    message: {
                        message: 'Đăng nhập thành công !',
                    },
                });
            } else {
                const findUserByEmail = await User.findOne({
                    email: profile.emails[0].value,
                });
                if (findUserByEmail) {
                    console.log('find Email');
                    findUserByEmail.provider = profile.provider;
                    findUserByEmail.googleId = profile.id;
                    User.findOneAndUpdate(
                        { email: profile.emails[0].value },
                        findUserByEmail,
                        {
                            returnOriginal: false,
                        }
                    )
                        .then((user) =>
                            done(null, {
                                info: {
                                    ...user,
                                    token: accessToken,
                                    avatar: profile.photos[0].value,
                                },
                                message: {
                                    message: 'Đăng nhập thành công !',
                                },
                            })
                        )
                        .catch(() =>
                            done(null, { message: 'User Not Found !!!' })
                        );
                    // done(null, 'find Email');
                } else {
                    var newUser = new User();
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.provider = profile.provider;
                    newUser.password = bcryptjs.hashSync(
                        profile.id + profile.provider,
                        8
                    );
                    newUser.googleId = profile.id;
                    newUser.email = profile.emails[0].value;
                    await newUser
                        .save()
                        .then(() =>
                            done(null, {
                                info: {
                                    _id: newUser._id,
                                    firstName: newUser.firstName,
                                    lastName: newUser.lastName,
                                    email: newUser.email,
                                    phone: newUser.phone,
                                    role: newUser.role,
                                    sex: newUser.sex,
                                    address: newUser.address,
                                    token: accessToken,
                                    avatar: profile.photos[0].value,
                                },
                                message: {
                                    message: 'Đăng nhập thành công !',
                                },
                            })
                        )
                        .catch((err) =>
                            // res.status(500).json({ error: err.message })
                            done(null, err)
                        );
                }
            }
        }
    )
);

//token Facebook
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/api/user/login-facebook/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            done(null, profile);
        }
    )
);
