const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
app.use(cors());

const login = require("./routes/auth.route");
app.use("/login", login);
const adminRoute = require("./routes/admin.route");
app.use("/admin", adminRoute);

const coffeRoute = require("./routes/coffe.route");
app.use("/coffe", coffeRoute);

const orderRoute = require("./routes/order.route");
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Server of Ticket Sales runs on port ${PORT}`);
});
