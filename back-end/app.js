const express = require("express");

const app = express();

const morgan = require("morgan");

const bodyParser = require("body-parser");
const cors = require("cors");


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, PATCH");
    return res.status(200).json({});
  }
  next();
});
const servicesRouter = require("./api/routes/services");

const ordersRouter = require("./api/routes/orders");

const usersRouter = require("./api/routes/users");

const itemsRouter = require("./api/routes/items");

const logIn = require("./api/routes/login");

const order_item = require("./api/routes/order_items");

const email = require('./api/routes/email')

app.use("/services", servicesRouter);

app.use("/orders", ordersRouter);

app.use("/users", usersRouter);

app.use("/items", itemsRouter);

app.use("/orderitem", order_item);

app.use("/login", logIn);

app.use("/send", email);


app.use((req, res, next) => {
  const error = new Error("Not Found ");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
