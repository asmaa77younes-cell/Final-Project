require("dotenv").config();
const app = require("./app");
const connectDB = require("./db/connectDb");

const config = require("./config/config");

connectDB().then(() => {
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
});