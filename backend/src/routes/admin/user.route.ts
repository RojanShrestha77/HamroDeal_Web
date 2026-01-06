import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/user.controller";

let adminUserController = new AdminUserController();

const router = Router();

router.post("/", adminUserController.createUser);
router.get("/:id", adminUserController.getOneUser);
router.get("/", adminUserController.getAllUser);
router.delete("/:id", adminUserController.deleteOneUser);
router.put("/:id", adminUserController.updateOneUser);

export default router;
