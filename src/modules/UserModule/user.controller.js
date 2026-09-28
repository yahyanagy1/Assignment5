import { Router } from "express";
import * as userServices from "./user.service.js"

const router = Router()

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "welcom to user module"
    })
})

// 1. Create user
router.post("/signup", async (req, res) => {
    const { status, message } = await userServices.signup(req.body)
    res.status(status).json({ message })
})

// 3. Find by email — لازم قبل "/:id"
router.get("/by-email", async (req, res) => {
    const { email } = req.query
    const result = await userServices.getUserByEmail(email)
    if (result.data) {
        return res.status(result.status).json(result.data)
    }
    res.status(result.status).json({ message: result.message })
})

// 2. Create or update by PK
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { status, message } = await userServices.upsertUser(id, req.body)
    res.status(status).json({ message })
})

// 4. Get by PK excluding role
router.get("/:id", async (req, res) => {
    const { id } = req.params
    const result = await userServices.getUserById(id)
    if (result.data) {
        return res.status(result.status).json(result.data)
    }
    res.status(result.status).json({ message: result.message })
})

export default router