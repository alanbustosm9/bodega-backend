const express = require("express");
require("dotenv").config();

// Crear el servidor de express
const app = express();

// Public
app.use(express.static("public"));

// Body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto : ${process.env.PORT}`);
});
