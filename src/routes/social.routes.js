import { Router } from "express";
import {addSocial, deleteSocial, getSocials} from '../controllers/social.controller.js';
import {protect} from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getSocials);
router.post('/', protect, addSocial);
router.delete("/:id", protect, deleteSocial);

export default router;
