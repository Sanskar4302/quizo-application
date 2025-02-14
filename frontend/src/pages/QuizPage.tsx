import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Quiz {
  title: string;
  description: string;
}

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz>({ title: '', description: '' });
  const [error, setError] = useState('');
  const teacherId = localStorage.getItem('teacherId');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch quiz details for editing
      axios.get(`http://localhost:5000/api/quizzes/${id}`)
        .then((response) => {
          setQuiz({ title: response.data.title, description: response.data.description });
        })
        .catch((error) => {
          console.error('Error fetching quiz details', error);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quiz.title || !quiz.description) {
      setError('Title and description are required');
      return;
    }
    try {
      if (id) {
        // Update quiz
        await axios.put(`http://localhost:5000/api/quizzes/${id}`, {
          title: quiz.title,
          description: quiz.description,
        });
      } else {
        // Create quiz
        await axios.post('http://localhost:5000/api/quizzes', {
          title: quiz.title,
          description: quiz.description,
          teacherId,
        });
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError('Error saving quiz');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          {id ? 'Edit Quiz' : 'Create Quiz'}
        </h2>
  
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
  
        <div className="mb-6">
          <label className="block text-lg text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter quiz title"
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-lg text-gray-300 mb-2">Description</label>
          <textarea
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter quiz description"
          />
        </div>
  
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 rounded-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
        >
          {id ? 'Update Quiz' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
  
};

export default QuizPage;
