import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span><i className="bi bi-book"></i></span>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Use cases</h3>
          <ul>
            <li><a href="#">UI design</a></li>
            <li><a href="#">UX design</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><a href="#">Design</a></li>
            <li><a href="#">Prototyping</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Best practices</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
