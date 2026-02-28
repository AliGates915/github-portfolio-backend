import {Router} from 'express';
import {addSkill, deleteSkill, getSkills} from '../controllers/skill.controller.js';
import {protect} from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getSkills);
router.post("/", protect, addSkill);
router.delete('/:id', protect, deleteSkill);

export default router;