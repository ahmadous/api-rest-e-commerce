const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const commandeRoute = require("./routes/commande");
const cartRoute = require("./routes/cart");
const path = require("path");
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB Connection successfully"))
	.catch((err) => {
		console.log(err);
	});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.set("views",path.resolve(__dirname,"view/ejs"))
app.use("/css", express.static(path.resolve(__dirname, "./src/assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "./src/assets/img")));
app.use("js", express.static(path.resolve(__dirname, "./src/assets/js")));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.render();
});
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/commandes", commandeRoute);
app.use("/api/carts", cartRoute);
app.use("/api/auth", authRoute);
app.listen(process.env.PORT || 5000, () => {
	console.log("backend server is running!");
});
