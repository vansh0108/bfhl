require("dotenv").config();
const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const bfhlRoutes = require("./routes/bfhl.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/bfhl", bfhlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
