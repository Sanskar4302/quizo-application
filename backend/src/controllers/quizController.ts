import { Request, Response } from 'express';
import { pool } from '../database';

// Create Quiz
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, description, teacherId } = req.body;
    if (!title || !description || !teacherId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const [result]: any = await pool.execute(
      'INSERT INTO quizzes (title, description, teacher_id, created_at) VALUES (?, ?, ?, NOW())',
      [title, description, teacherId]
    );
    res.status(201).json({ message: 'Quiz created', quizId: result.insertId });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get All Quizzes
export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const [quizzes] = await pool.execute('SELECT * FROM quizzes');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get Quiz by ID
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [quiz]: any = await pool.execute('SELECT * FROM quizzes WHERE id = ?', [id]);

    if (quiz.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(quiz[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update Quiz
export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [result]: any = await pool.execute(
      'UPDATE quizzes SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz updated' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete Quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.execute('DELETE FROM quizzes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
