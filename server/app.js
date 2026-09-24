require("dotenv").config();
const express = require("express");
const BookingRoutes=require("./src/routes/bookingRoutes");
const EventRoutes = require("./src/routes/eventRoutes");

const DBConnection = require("./src/config/db");

const app = express();
DBConnection()
const PORT = 3001;

app.use(express.json())  // middleware

app.get("/", (req, res) => {
  res.send("Hello, your Express server is running!");
});

app.use("/booking",BookingRoutes);
app.use("/event",EventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
