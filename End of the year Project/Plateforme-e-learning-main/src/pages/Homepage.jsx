import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import './Homepage.css';

const mockCourses = [
  { 
    id: 1, 
    title: 'Complete Web Design Fundamentals', 
    description: 'Master the principles of modern web design including typography, color theory, layout composition, and responsive design patterns. Perfect for beginners starting their design journey.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop'
  },
  { 
    id: 2, 
    title: 'Advanced CSS & Sass Mastery', 
    description: 'Deep dive into advanced CSS techniques, animations, Grid, Flexbox, and Sass preprocessing. Learn to build stunning, performant stylesheets for modern web applications.',
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=400&fit=crop'
  },
  { 
    id: 3, 
    title: 'React & Modern JavaScript Development', 
    description: 'Build dynamic, interactive web applications with React. Cover hooks, state management, component architecture, and modern ES6+ JavaScript features.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
  },
  { 
    id: 4, 
    title: 'UI/UX Design Principles & Prototyping', 
    description: 'Learn user-centered design methodology, wireframing, prototyping with Figma, user research techniques, and creating intuitive interfaces that users love.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop'
  },
  { 
    id: 5, 
    title: 'Responsive Web Design & Mobile-First', 
    description: 'Create websites that look perfect on any device. Master media queries, flexible grids, mobile-first approach, and progressive enhancement strategies.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=400&fit=crop'
  },
  { 
    id: 6, 
    title: 'Web Accessibility & Inclusive Design', 
    description: 'Build websites for everyone. Learn WCAG guidelines, semantic HTML, ARIA attributes, keyboard navigation, and testing tools for accessible web experiences.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop'
  },
];

function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1>ONLINE COURSES</h1>
          <p>Discover thousands of courses to boost your skills</p>
        </div>
      </div>

      <div className="homepage-content">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search courses"
            />
            <button className="search-btn" aria-label="Search">
              Search
            </button>
          </div>
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Homepage;
