const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            if (error) {
                console.log(error)
                res.status(403);
                res.json({ message: 'Accès interdit : token invalide' });
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403);
        res.json({ message: "Accès interdit : token manquant" })
    }
}

exports.verifyRoleAdmin = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            if (error) {
                console.log(error)
                res.status(403);
                res.json({ message: 'Accès interdit : token invalide' });
            }
            else if (payload.role !== "admin") {
                res.status(403);
                res.json({ message: 'Accès interdit : admin role needed' });
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403);
        res.json({ message: "Accès interdit : token manquant" })
    }
}

exports.verifyRoleUserAndMore = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            if (error) {
                console.log(error)
                res.status(403);
                res.json({ message: 'Accès interdit : token invalide' });
            }
            else if (payload.role === "admin") {
                next();
            }
            else if (payload.role !== "user") {
                res.status(403);
                res.json({ message: 'Accès interdit : user role needed' });
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403);
        res.json({ message: "Accès interdit : token manquant" })
    }
}