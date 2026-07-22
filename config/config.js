require("dotenv").config();

if(!process.env.MONGO_URI){
  throw new Error("MONGO_URI isn't defined in .env file")
}

if(!process.env.PORT){
  console.log("Port not found, we will use the virtual port = 3000")n
}

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development"
};

module.exports = config;