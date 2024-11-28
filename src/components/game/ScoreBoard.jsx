import React from 'react';
import Card from '../ui/Card';

const ScoreBoard = ({ 
  score, 
  level, 
  rank 
}) => {
  return (
    <Card className="flex justify-between items-center">
      <div className="text-center">
        <p className="text-sm text-gray-600">Pontuação</p>
        <p className="text-2xl font-bold">{score}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Nível</p>
        <p className="text-2xl font-bold">{level}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Rank</p>
        <p className="text-2xl font-bold">{rank}</p>
      </div>
    </Card>
  );
};

export default ScoreBoard;
