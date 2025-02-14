import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Hardcoded credentials for demonstration
  if (username === 'teacher' && password === 'password') {
    // For simplicity, we return a teacherId
    res.status(200).json({ message: 'Login successful', teacherId: 1 });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
