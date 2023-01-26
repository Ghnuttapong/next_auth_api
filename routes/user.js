const router = require("express").Router();
const {
  getAll,
  getId,
  deleteId,
  updateId,
  enabledId
} = require("../controllers/userContoller");
const { verifyToken, isAdmin } = require("../middlewares/token");

router.get("/", verifyToken, isAdmin, getAll);
router.get("/:id", verifyToken, isAdmin, getId);
router.delete("/:id", verifyToken, isAdmin, deleteId);
router.put("/:id", verifyToken, isAdmin, updateId);
router.post("/enabled/:id", verifyToken, isAdmin, enabledId);

module.exports = router;
