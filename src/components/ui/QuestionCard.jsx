import React from 'react';
import { useStore } from '@nanostores/react';
import { userStore } from '../../stores/authStore';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

export function QuestionCard({ question }) {
  const user = useStore(userStore);

  const handleVote = async (voteType) => {
    if (!user.isAuthenticated) {
      // TODO: Mostrar modal de login
      return;
    }

    try {
      const response = await fetch(`/api/questions/${question._id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ voteType })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/20 p-6 mb-4 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Votos */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => handleVote('up')}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            title="Votar positivamente"
          >
            <ThumbsUp className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
          </button>
          <span className="font-medium text-gray-700 dark:text-gray-300">{question.votes}</span>
          <button
            onClick={() => handleVote('down')}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            title="Votar negativamente"
          >
            <ThumbsDown className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">
            <a 
              href={`/questions/${question._id}`} 
              className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {question.title}
            </a>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {question.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags?.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span>{new Date(question.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                {question.answers?.length || 0} respostas
              </span>
              <span>{question.views} visualizações</span>
            </div>

            <div className="flex items-center space-x-2">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(question.author)}&background=random`}
                alt={question.author}
                className="w-6 h-6 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
              />
              <span className="text-gray-700 dark:text-gray-300">{question.author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
