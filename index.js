import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoute from "./routes/posts.js";

import { config } from "dotenv";


const app = express();
// middlewares
config();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: false,
  })
);

// mongodb

let mogooseURL = process.env.DATABASE_URL;

let PORT = process.env.PORT || 5000;

mongoose
  .connect(mogooseURL)
  .then(() => app.listen(PORT, () => console.log("Server rununing ", PORT)))

  .catch((error) => console.log(error));

app.use(cors());
app.use("/posts", postRoute);
