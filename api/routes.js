// app/routes.js
module.exports = function(app, passport) {

    app.all('/*', function(req, response, next) {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        next();
    });

    app.get('/accounts', (req, res) => {
        return accountController.index(req, res)
    })

    app.post('/accounts', (req, res) => {
        return accountController.create(req, res)
    })

    app.get('/accounts/:nickname', (req, res) => {
        return accountController.indexOne(req, res)
    })

    app.get('/leaderboard', (req, res) => {
        return leaderboardController.index(req, res)
    })

    app.post('/leaderboard', (req, res) => {
        return leaderboardController.create(req, res)
    })

    // process the login form
    app.post('/game', passport.authenticate('local-login', {
            successRedirect : '/game', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {
            console.log("MAAAAAAAAAAAAAAAAAAAAXX");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.json({
                status: 'success'
            })
        });



    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/game', isLoggedIn, function(req, res) {
        console.log('hey tes co');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();



    // if they aren't redirect them to the home page
    console.log("tes coooo mon gars :!!!!!!!!!!!!!!!!!!!!!!!!");
    res.json({
        status: 'success'
    })
    // res.redirect('/');
}
