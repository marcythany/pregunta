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
    <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-md hover:shadow-lg border border-light-text-secondary/10 dark:border-dark-text-secondary/10 p-6 mb-4 transition-all duration-300">
      <div className="flex items-start space-x-4">
        {/* Votos */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => handleVote('up')}
            className="p-1 rounded hover:bg-light-background dark:hover:bg-dark-background transition-colors group"
            title="Votar positivamente"
          >
            <ThumbsUp className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-light-primary dark:group-hover:text-dark-primary" />
          </button>
          <span className="font-medium text-light-text-primary dark:text-dark-text-primary">{question.votes}</span>
          <button
            onClick={() => handleVote('down')}
            className="p-1 rounded hover:bg-light-background dark:hover:bg-dark-background transition-colors group"
            title="Votar negativamente"
          >
            <ThumbsDown className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-error-light dark:group-hover:text-error-dark" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">
            <a 
              href={`/questions/${question._id}`} 
              className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {question.title}
            </a>
          </h2>
          
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-3">
            {question.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags?.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-light-background dark:bg-dark-background text-sm text-light-text-secondary dark:text-dark-text-secondary transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary">
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
                className="w-6 h-6 rounded-full ring-2 ring-light-text-secondary/20 dark:ring-dark-text-secondary/20"
              />
              <span className="text-light-text-primary dark:text-dark-text-primary">{question.author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
