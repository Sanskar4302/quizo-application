import { Router } from 'express';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController';

const router = Router();

router.post('/quizzes', createQuiz);         // Create Quiz
router.get('/quizzes', getQuizzes);          // Get All Quizzes
router.get('/quizzes/:id', getQuizById);     // Get Quiz by ID
router.put('/quizzes/:id', updateQuiz);      // Update Quiz
router.delete('/quizzes/:id', deleteQuiz);   // Delete Quiz

export default router;
