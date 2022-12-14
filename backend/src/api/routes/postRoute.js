module.exports = (server) => {
    const postController = require("../controllers/postController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");
server.route("/posts")
.get(jwtMiddleware.verifyRoleUserAndMore, postController.listAllPosts)
.post(jwtMiddleware.verifyToken, jwtMiddleware.verifyRoleAdmin, postController.createAPost);

server.route("/posts/:post_id") // req.params.post_id
.all(jwtMiddleware.verifyToken)
.get(postController.getAPost)
.put(postController.updateAPost)
.delete(postController.deleteApost);
}