import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

interface Quiz {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const teacherId = localStorage.getItem('teacherId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!teacherId) {
      navigate('/login');
      return;
    }
    fetchQuizzes();
  }, [teacherId, navigate]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quizzes', {
        params: { teacherId },
      });
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quiz', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-6 text-center">
          Quiz Dashboard
        </h1>
  
        <div className="mb-8 flex justify-center">
          <Link to="/quiz" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 transition duration-300 ease-in-out transform hover:scale-105">
            Create New Quiz
          </Link>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-white mb-2">{quiz.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{quiz.description}</p>
              <p className="text-xs text-gray-500 mb-4">
                Created on: {new Date(quiz.created_at).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between space-x-4">
                <Link to={`/quiz/${quiz.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
