const express = require("express");
const app = express();
const env = require("dotenv");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const cors = require("cors");
env.config();
const routes = require("./routes/");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

app
	.use(bodyParser.json())
	.use(session({
		secret: "secret",
		resave: false,
		saveUninitialized: true
	}))
	// This is the basic express session({...}) initialization
	.use(passport.initialize())
	// init passport in every route call.
    .use(passport.session())
	// Init passport to use "express-session"
    .use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"	
		);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"POST, GET, PUT, PATCH, OPTIONS, DELETE"
		);
		next();
	})
	.use(cors({methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]}))
	.use(cors({origin: "*"}))
	.use("/", routes);

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
        //})
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
	failureRedirect: '/api-docs', session: false}),
	(req, res) => {
	req.session.user = req.user;
	res.redirect("/");
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught Exception: ${err}/n`,  `Exception Origin: ${origin};`);
})

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
        console.log(`Database is listening and Node running on port ${port}`);
        });
    }
});