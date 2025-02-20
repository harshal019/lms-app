const mongoose = require("mongoose");  // Corrected here

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL, {  })
        .then(() => console.log("Database connected successfully"))
        .catch((err) => console.error("Database connection failed:", err));
};

module.exports = {dbConnect};


