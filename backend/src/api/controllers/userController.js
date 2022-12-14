const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const salt = 5;

exports.userRegister = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    let newUser = new User(req.body);

    newUser.save((error, user) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(201);
            res.json({ message: `Utilisateur crée : ${user.email}` });
        }
    })
}

exports.loginRegister = (req, res) => {
    // Find user
    User.findOne({ email: req.body.email }, (error, user) => {
        // If user not found
        if (error || !user) {
            res.status(500);
            console.log(error);
            res.json({ message: "Utilisateur non trouvé" });
        }
        else {
            // User found
            if (user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
                // Password correct
                let userData = {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
                jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                    if (error) {
                        res.status(500);
                        console.log(error);
                        res.json({ message: "Impossible de générer le token" });

                    }
                    else {
                        res.status(200);
                        res.json({ ...user._doc, token });
                    }
                })
            }
            else {
                // Password don't match
                res.status(401);
                console.log(error);
                res.json({ message: "Email ou Mot de passe incorrect" });

            }
        }
    })
}

exports.listAllUsers = (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(users);
        }
    })
}

exports.deleteAuser = (req, res) => {
    User.findByIdAndRemove(req.params.user_id, (error) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({ message: "User supprimé" });
        }

    })
}
