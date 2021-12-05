require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
const routes = require("./routes/API");
server.use(express.json());
server.use(cors(corsOptions));
server.use(cookieParser());
const dbURI = process.env.MONGO_URI;
const PORT = 9000;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    server.listen(PORT);
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));
server.use(routes);
