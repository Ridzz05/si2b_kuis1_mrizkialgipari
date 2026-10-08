// Rute resource /paintings.
const express = require("express");
const controller = require("../controllers/paintingsController");
const { cekApiKey } = require("../middlewares/cekApiKey");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", cekApiKey, controller.create);
router.put("/:id", cekApiKey, controller.update);
router.delete("/:id", cekApiKey, controller.remove);

module.exports = router;
