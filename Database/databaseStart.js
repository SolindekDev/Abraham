const mongoose = require("mongoose");

module.exports = () => {
  const uri = "mongodb://localhost:27017/abraham";
    
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  
  const connection = mongoose.connection;
  
  connection.once("open", () => {
    console.log("✅ Connection Open with Database!");
  });
}
  
