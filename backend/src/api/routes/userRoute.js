module.exports = (server) => {
const userController = require("../controllers/userController");

server.post("/user/register", userController.userRegister);
server.post("/user/login", userController.loginRegister);
server.get("/users", userController.listAllUsers);
server.delete("/user/:user_id", userController.deleteAuser);
}
