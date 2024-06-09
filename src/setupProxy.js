const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/device/create",
    createProxyMiddleware({
      target: "http://3.34.2.12:8080",
      changeOrigin: true,
    })
  );
};
