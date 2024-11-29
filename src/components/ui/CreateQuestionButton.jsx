import React from 'react';
import { useStore } from '@nanostores/react';
import { userStore } from '../../stores/authStore';
import { Plus } from 'lucide-react';

export function CreateQuestionButton() {
  const user = useStore(userStore);

  const handleClick = () => {
    if (!user.isAuthenticated) {
      // TODO: Mostrar modal de login
      return;
    }

    const permission = user.permissions?.CREATE_QUESTION;
    if (!permission?.hasPermission) {
      // TODO: Mostrar modal informando pontos necessários
      alert(`Você precisa de ${permission?.pointsNeeded} pontos para criar uma pergunta`);
      return;
    }

    // Redirecionar para página de criar pergunta
    window.location.href = '/questions/new';
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Criar Pergunta</span>
    </button>
  );
}
