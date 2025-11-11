import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetail.css';

const courseData = {
  1: { 
    title: 'Complete Web Design Fundamentals', 
    description: 'Master the principles of modern web design including typography, color theory, layout composition, and responsive design patterns. Perfect for beginners starting their design journey.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    syllabus: [
      'Module 1: Introduction to Web Design Principles',
      'Module 2: Typography and Color Theory',
      'Module 3: Layout Composition and Grid Systems',
      'Module 4: Responsive Design Patterns and Best Practices'
    ]
  },
  2: { 
    title: 'Advanced CSS & Sass Mastery', 
    description: 'Deep dive into advanced CSS techniques, animations, Grid, Flexbox, and Sass preprocessing. Learn to build stunning, performant stylesheets for modern web applications.',
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=400&fit=crop',
    syllabus: [
      'Module 1: Advanced CSS Selectors and Specificity',
      'Module 2: CSS Grid and Flexbox Mastery',
      'Module 3: Animations and Transitions',
      'Module 4: Sass Preprocessing and Architecture'
    ]
  },
  3: { 
    title: 'React & Modern JavaScript Development', 
    description: 'Build dynamic, interactive web applications with React. Cover hooks, state management, component architecture, and modern ES6+ JavaScript features.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    syllabus: [
      'Module 1: Modern JavaScript ES6+ Features',
      'Module 2: React Fundamentals and Components',
      'Module 3: Hooks and State Management',
      'Module 4: Advanced Patterns and Performance'
    ]
  },
  4: { 
    title: 'UI/UX Design Principles & Prototyping', 
    description: 'Learn user-centered design methodology, wireframing, prototyping with Figma, user research techniques, and creating intuitive interfaces that users love.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
    syllabus: [
      'Module 1: User Research and Personas',
      'Module 2: Wireframing and Information Architecture',
      'Module 3: Prototyping with Figma',
      'Module 4: Usability Testing and Iteration'
    ]
  },
  5: { 
    title: 'Responsive Web Design & Mobile-First', 
    description: 'Create websites that look perfect on any device. Master media queries, flexible grids, mobile-first approach, and progressive enhancement strategies.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=400&fit=crop',
    syllabus: [
      'Module 1: Mobile-First Design Philosophy',
      'Module 2: Flexible Grids and Fluid Layouts',
      'Module 3: Media Queries and Breakpoints',
      'Module 4: Progressive Enhancement Strategies'
    ]
  },
  6: { 
    title: 'Web Accessibility & Inclusive Design', 
    description: 'Build websites for everyone. Learn WCAG guidelines, semantic HTML, ARIA attributes, keyboard navigation, and testing tools for accessible web experiences.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop',
    syllabus: [
      'Module 1: WCAG Guidelines and Standards',
      'Module 2: Semantic HTML and ARIA',
      'Module 3: Keyboard Navigation and Focus Management',
      'Module 4: Testing Tools and Accessibility Audits'
    ]
  },
};

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData[id] || { 
    title: 'Course Title', 
    description: 'Course description',
    image: '',
    syllabus: []
  };

  return (
    <main className="course-detail-page">
      <div className="course-content">
        <div className="course-header">
          <div className="course-thumbnail">
            {course.image && <img src={course.image} alt={course.title} />}
          </div>
          <div className="course-meta">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <button 
              className="btn-primary"
              onClick={() => navigate(`/quiz/${id}`)}
            >
              Start Course
            </button>
          </div>
        </div>

        <div className="syllabus-section">
          <h2>Syllabus</h2>
          <ul className="syllabus-list">
            {course.syllabus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default CourseDetail;
