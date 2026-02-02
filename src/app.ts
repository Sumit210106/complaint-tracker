import express from "express";
import cors from "cors";
import complaintRoutes from "./routes/complaint.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/complaints", complaintRoutes);

// ❗ MUST be last middleware
app.use(errorHandler);

export default app;
