const Koa = require("koa");
const config = require("config");

const app = new Koa();
const PORT = config.get("port");

app.use(async (ctx) => {
  ctx.body = "Hello world!";
});

app.listen(PORT);
console.log(`API running on: http://localhost:${PORT}`);
