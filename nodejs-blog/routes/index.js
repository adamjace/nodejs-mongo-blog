var SessionHandler = require('./session')
  , ContentHandler = require('./content')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var contentHandler = new ContentHandler(db);

    app.use(sessionHandler.isLoggedInMiddleware);
    
    // set routing
    app.get('/', contentHandler.displayMainPage);
    app.get('/tag/:tag', contentHandler.displayMainPageByTag);
    app.get("/post/:permalink", contentHandler.displayPostByPermalink);
    app.post('/newcomment', contentHandler.handleNewComment);
    app.get("/post_not_found", contentHandler.displayPostNotFound);
    app.get('/newpost', contentHandler.displayNewPostPage);
    app.post('/newpost', contentHandler.handleNewPost);
    app.post('/like', contentHandler.handleLike);
    app.get('/login', sessionHandler.displayLoginPage);
    app.post('/login', sessionHandler.handleLoginRequest);
    app.get('/logout', sessionHandler.displayLogoutPage);
    app.get("/welcome", sessionHandler.displayWelcomePage);
    app.get('/signup', sessionHandler.displaySignupPage);
    app.post('/signup', sessionHandler.handleSignup);
    
    app.use(ErrorHandler);
};
