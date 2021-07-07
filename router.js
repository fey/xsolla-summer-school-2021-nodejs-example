import Router from "express";
import GameController from "./controllers/GameController.js";

const router = new Router();

router.post("/games", GameController.create);
router.get("/games/:id", GameController.read);
router.put("/games/", GameController.update);
router.delete("/games/:id", GameController.delete);
router.get("/games", GameController.getAll);

export default router;
