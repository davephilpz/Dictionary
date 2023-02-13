exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    contentTitle: "",
    path: "/404",
    userAuthId: req.userAuthId,
    session: req.session,
  });
};

//app.use handles all http requests and not specifying a route means that anything that is not matched to above routes (ran in order) will be caught in this middleware.
