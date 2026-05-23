import { Router } from "express"
import itemRoute from "./item.js"
import profileRoute from "./profile.js"

const router = Router()

router.get("/profile", profileRoute)
router.get("/item", itemRoute)

export default router