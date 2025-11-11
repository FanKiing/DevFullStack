import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuizPage.css';

const quizData = {
  1: {
    title: 'Complete Web Design Fundamentals',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    questions: [
      {
        question: 'What is the primary purpose of typography in web design?',
        options: [
          'To make text colorful',
          'To enhance readability and visual hierarchy',
          'To fill empty space',
          'To make websites load faster'
        ],
        correct: 1
      }
    ]
  },
  2: {
    title: 'Advanced CSS & Sass Mastery',
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=400&fit=crop',
    questions: [
      {
        question: 'Which CSS property is used to create a flexible box layout?',
        options: [
          'display: block',
          'display: flex',
          'display: inline',
          'display: table'
        ],
        correct: 1
      }
    ]
  },
  3: {
    title: 'React & Modern JavaScript Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    questions: [
      {
        question: 'What is the purpose of React Hooks?',
        options: [
          'To style components',
          'To manage state and side effects in functional components',
          'To create class components',
          'To optimize images'
        ],
        correct: 1
      }
    ]
  },
  4: {
    title: 'UI/UX Design Principles & Prototyping',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
    questions: [
      {
        question: 'What does UX stand for in web design?',
        options: [
          'Universal Experience',
          'User Experience',
          'Unique Extension',
          'Unified Exchange'
        ],
        correct: 1
      }
    ]
  },
  5: {
    title: 'Responsive Web Design & Mobile-First',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=400&fit=crop',
    questions: [
      {
        question: 'What is the mobile-first approach in responsive design?',
        options: [
          'Designing for desktop first',
          'Designing for mobile devices first, then scaling up',
          'Only designing for mobile',
          'Ignoring desktop users'
        ],
        correct: 1
      }
    ]
  },
  6: {
    title: 'Web Accessibility & Inclusive Design',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop',
    questions: [
      {
        question: 'What does WCAG stand for?',
        options: [
          'Web Content Accessibility Guidelines',
          'World Computer Access Group',
          'Website Color and Graphics',
          'Web Coding and Graphics'
        ],
        correct: 0
      }
    ]
  }
};

function QuizPage() {
  const { id } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const quiz = quizData[id] || {
    title: 'Quiz',
    image: '',
    questions: [{ question: 'Sample question?', options: ['A', 'B', 'C', 'D'], correct: 0 }]
  };

  const currentQuestion = quiz.questions[0];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const correct = selectedAnswer === currentQuestion.correct;
      setIsCorrect(correct);
      setShowResult(true);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <main className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-image">
          {quiz.image && <img src={quiz.image} alt={quiz.title} />}
        </div>
        
        <div className="question-section">
          <h2>Course Title</h2>
          <p className="course-title">{quiz.title}</p>
          
          <p className="question-text">{currentQuestion.question}</p>
          
          <div className="options-list">
            {currentQuestion.options.map((option, index) => (
              <label key={index} className="option-item">
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => setSelectedAnswer(index)}
                  disabled={showResult}
                />
                <span className="option-label">Label</span>
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>

          {!showResult ? (
            <button 
              className={`btn-submit ${isSubmitting ? 'submitting' : ''}`}
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Button'}
            </button>
          ) : (
            <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '✓ Correct! Well done!' : '✗ Incorrect. Try again!'}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default QuizPage;
