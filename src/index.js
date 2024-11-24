import express from "express";
import cors from "cors"
import { PORT,FRONTEND } from "./config/env.config.js";
import {appRoutes} from "./routers/email.routers.js"
const app = express();
let port = PORT||3000
app.use(cors(
    {
        origin:FRONTEND,
        credentials: true
    }
))
app.use(express.json());
app.use("/api",appRoutes)
app.listen(port,()=>{
    console.log(`Server is listining at http://localhost:${port}`);
})