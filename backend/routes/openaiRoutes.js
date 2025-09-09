import express from 'express';
import {
  transcribeAudio,
  getCookingAssistance
} from '../controllers/openaiController.js';

const router = express.Router();

router.route('/transcribe').post(transcribeAudio);
router.route('/cooking-assistance').post(getCookingAssistance);

export default router;