const speedCheckMiddleware = (req, res, next) => {
  const start = Date.now();

  res.once("finish", () => {
    const elapsed = Date.now() - start;
    let emoji;

    if (elapsed <= 200) {
      emoji = "🚀"; // Rocket emoji for fast response
    } else if (elapsed <= 500) {
      emoji = "🐇"; // Rabbit emoji for medium response
    } else {
      emoji = "🐢"; // Turtle emoji for slow response
    }

    console.log(`[${req.method} ${req.url}] ${elapsed}ms ${emoji}`);
  });

  next();
};

module.exports = speedCheckMiddleware;
