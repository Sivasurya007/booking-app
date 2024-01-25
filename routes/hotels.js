import express from "express";
import { createhotel, deletehotel, getallhotel, gethotel, updatehotel } from "../controllers/hotel.js";

const router = express.Router()

router.post("/",createhotel)
router.put("/:id",updatehotel)
router.delete("/:id",deletehotel)
router.get("/:id",gethotel)
router.get("/",getallhotel)

export default router