import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
    const [quizStarted, setQuizStarted] = useState(false);

    const handleStartQuiz = () => {
        setQuizStarted(true);
    };

    const handleStopQuiz = () => {
        setQuizStarted(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Quiz Application</h1>
                {!quizStarted ? (
                    <button className="quiz-btn" onClick={handleStartQuiz}>Start Quiz</button>
                ) : (
                    <Quiz onQuizEnd={handleStopQuiz} />
                )}
            </header>
        </div>
    );
}

export default App;
