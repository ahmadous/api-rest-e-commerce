const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
			if (err) res.status(403).json("votre token n'est pas valide");
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json("Vous n'etes pas authentifie!");
	}
};
const verifyTokenAndAuthorization = (req, res,next) => {
	verifyToken(req, res, () => {
		if (req.User.id === req.params.id || req.user.isAdmin) {
            next();
		} else {
			res.status(403).json("Vous n'etes pas authorise a executer cette  !");
		}
	});
};
const verifyTokenAndAdmin= (req, res,next) => {
	verifyToken(req, res, () => {
		if ( req.user.isAdmin) {
            next();
		} else {
			res.status(403).json("Vous n'etes pas authorise a executer cette  !");
		}
	});
};
module.exports = { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin};
