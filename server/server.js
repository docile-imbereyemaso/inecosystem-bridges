import express from "express";
import companyRoutes from "../server/routes/ineco.routes.js";
import tvetRoutes from '../server/routes/tvetRoutes.js'

import cors from "cors";




const app = express();
// Allow all origins (for development)
app.use(cors());

// Or more selectively:
// app.use(cors({ origin: "http://localhost:5173" }));

// app.use(express.json());
app.use(express.json());

app.use("/api", companyRoutes);
app.use("api",tvetRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));