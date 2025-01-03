const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require("../../controllers/userController");

// /api/users
router.route("/")
  .get(getAllUsers)
  .post(createUser);

// /api/students/:userId
router.route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:userId/friends/:friendId")
  .post(addFriend) // ADDING A FRIEND
  .delete(removeFriend) // REMOVING A FRIEND

module.exports = router;
