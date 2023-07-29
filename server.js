const express = require("express");
const getLogger = require("./logger");
const apiRouter = require("./routes/apiRouter");

const PORT = 3000;
const logger = getLogger("server");
const app = express();

app.use(express.json());
app.use("/api", apiRouter);

const server = app.listen(PORT, () => {
  logger.log(`Server running on port ${PORT}`);
});

module.exports = server;
