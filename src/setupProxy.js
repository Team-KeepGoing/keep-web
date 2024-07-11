const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/device/create",
    createProxyMiddleware({
      target: "http://15.165.16.79:8080",
      changeOrigin: true,
    })
  );
};
