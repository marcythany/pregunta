import React from 'react';
import Card from '@ui/base/Card';

const ScoreBoard = ({ 
  score, 
  level, 
  rank 
}) => {
  return (
    <Card className="flex justify-between items-center">
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">Pontuação</p>
        <p className="text-2xl font-bold dark:text-white">{score}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">Nível</p>
        <p className="text-2xl font-bold dark:text-white">{level}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">Rank</p>
        <p className="text-2xl font-bold dark:text-white">{rank}</p>
      </div>
    </Card>
  );
};

export default ScoreBoard;
