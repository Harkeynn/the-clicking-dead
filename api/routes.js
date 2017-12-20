// app/routes.js
module.exports = function(app, passport) {
    const accountController = require('./controllers/account')
    const leaderboardController = require('./controllers/leaderboard')
    const achievementController = require('./controllers/achievement')
    const accountAchievementController = require('./controllers/accountAchievement')

//AccountAchievement

    app.get('/accountachievement', (req, res) => {
      return accountAchievementController.index(req, res)
    })
    app.post('/accountachievement', (req, res) => {
      return accountAchievementController.create(req, res)
    })

//ACHIEVEMENT

    app.get('/achievement', (req, res) => {
      return achievementController.index(req, res)
    })

//ACCOUNT
    app.get('/accounts', (req, res) => {
        return accountController.index(req, res)
    })

    app.post('/accounts', (req, res) => {
        return accountController.create(req, res)
    })

    /*app.get('/accounts/:nickname', (req, res) => {
        return accountController.indexOne(req, res)
    })*/

    app.get('/accounts/:id', (req, res) => {
        return accountController.indexOneWithId(req, res)
    })

    app.get('/leaderboard', (req, res) => {
        console.log("USEEER" + userData.id);
        return leaderboardController.index(req, res)
    })

    app.post('/leaderboard', (req, res) => {
        return leaderboardController.create(req, res)
    })

    app.get('/user', (req, res) => {
        console.log("ROUTE GET USER")

        let userData = require('./userdata');
        let userId = userData.id;
        console.log(userId);

        if(userId.length === 0){
            console.log("no user connected ");

            return res.json({
                shouldModalBeOpened: true
            })
        } else {
            console.log("user connected !!");

            return res.json({
                shouldModalBeOpened: false
            })
        }

    })



    app.get('/userid', (req, res) => {
        let userData = require('./userdata');
        return res.json({
            userid: userData.id
        })
    })

    //process the login form
    app.post('/game', passport.authenticate('local-login', {
            successRedirect : '/game', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
        });

    // app.post('/game', passport.authenticate('local-login', {
    //         successRedirect : '/game', // redirect to the secure profile section
    //         failureRedirect : '/login', // redirect back to the signup page if there is an error
    //         failureFlash : true // allow flash messages
    //     }),
    //     function(req, res) {
    //
    //         if (req.body.remember) {
    //             req.session.cookie.maxAge = 1000 * 60 * 3;
    //         } else {
    //             req.session.cookie.expires = false;
    //         }
    //     });

/*        app.post('/game', function (req, res, next) {
            passport.authenticate('local-login', function (err, user, info) {
                if (err) {
                    // mysend(res, 500, 'Ups. Something broke!');
                } else if (info) {
                    // mysend(res, 401, 'unauthorized');
                } else {
                    req.login(user, function(err) {
                        if (err) {
                            // mysend(res, 500, 'Ups.');
                        } else {
                            // mysend(res, 200, JSON.stringify(user));
                        }
                        })
                }
            })(req, res, next);
        });*/



    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        // res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/game', // redirect to the secure profile section
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


/*    app.get('/game', function(req, res) {

    });*/

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
    console.log("isLoggedIn");

    console.log(req.isAuthenticated());

    if (req.isAuthenticated()) {
        console.log("isAUTEHNTIFICATE JHUUYVYTYTFYTFRFY");

        return next();


    }

    // if they aren't redirect them to the home page
    console.log("tes coooo mon gars :!!!!!!!!!!!!!!!!!!!!!!!!");
    res.json({
        status: 'success'
    })
    // res.redirect('/');
}
