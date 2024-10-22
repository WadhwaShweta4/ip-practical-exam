import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ onQuizEnd }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/quiz-questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching quiz questions:', error));
    }, []);

    const handleAnswerSelection = (questionId, selectedAnswer) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: selectedAnswer,
        });
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((question) => {
            if (userAnswers[question.id] === question.correctAnswer) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setQuizCompleted(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handleStopQuiz = () => {
        setQuizCompleted(true);
    };

    const handleStartAgain = () => {
        setUserAnswers({});
        setCurrentQuestionIndex(0);
        setQuizCompleted(false);
        setScore(0);
    };

    if (quizCompleted) {
        return (
            <div className="quiz-container">
                <h2>Quiz Completed</h2>
                <p>Your Score: {score}/{questions.length}</p>
                <button className="quiz-btn" onClick={handleStartAgain}>Start Again</button>
                <button className="quiz-btn" onClick={onQuizEnd}>Stop Quiz</button>
            </div>
        );
    }

    if (questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h2>Quiz Time!</h2>
            <h3>Question {currentQuestionIndex + 1}/{questions.length}</h3>
            <p>{currentQuestion.question}</p>
            <ul>
                {currentQuestion.options.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type="radio"
                                name={`question-${currentQuestion.id}`}
                                value={option}
                                onChange={() => handleAnswerSelection(currentQuestion.id, option)}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
            <button className="quiz-btn" onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
            </button>
            <button className="quiz-btn stop-btn" onClick={handleStopQuiz}>Stop Quiz</button>
        </div>
    );
};

export default Quiz;
