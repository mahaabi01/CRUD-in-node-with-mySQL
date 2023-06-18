import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

//for router
app.use("/user", userRouter)

//connecting to database
app.listen(8000, async () => {
  console.log("Server has started.");
  
});
