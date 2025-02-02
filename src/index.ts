import dotenv from "dotenv";
import { ExpressServer } from "./server";

dotenv.config();
const server = new ExpressServer();
server.start();
