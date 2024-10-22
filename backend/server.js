const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Static quiz questions
const quizQuestions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "Paris",
    },
    {
        id: 2,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
    },
    {
        id: 3,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
    },
    {
        id: 4,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Leo Tolstoy"],
        correctAnswer: "William Shakespeare",
    },
    {
        id: 5,
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        correctAnswer: "Blue Whale",
    }
];


app.get('/quiz-questions', (req, res) => {
    res.json(quizQuestions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
