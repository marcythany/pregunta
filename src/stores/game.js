import { atom, map } from 'nanostores';

// Estado do jogo
export const gameState = atom('idle'); // idle, playing, finished

// Pontuação do jogador
export const score = atom(0);

// Perguntas e respostas
export const currentQuestion = map({
    question: '',
    options: [],
    correctAnswer: '',
    category: ''
});

// Timer
export const timer = atom(0);

// Funções para manipular o estado
export function startGame() {
    gameState.set('playing');
    score.set(0);
    timer.set(0);
}

export function endGame() {
    gameState.set('finished');
}

export function updateScore(points) {
    score.set(score.get() + points);
}

export function setQuestion(questionData) {
    currentQuestion.set(questionData);
}

export function resetGame() {
    gameState.set('idle');
    score.set(0);
    timer.set(0);
    currentQuestion.set({
        question: '',
        options: [],
        correctAnswer: '',
        category: ''
    });
}
