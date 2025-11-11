import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-logo">
          <span><i className="bi bi-book"></i></span>
        </div>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
        </div>

        <div className="nav-buttons">
          <button className="btn-nav btn-signin">Sign In</button>
          <button className="btn-nav btn-signup">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
