import express, { Express } from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./config/database";
import { routesClient } from "./routes/client/index.route";

connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

routesClient(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})