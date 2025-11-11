import { useNavigate } from 'react-router-dom';
import './CourseCard.css';

function CourseCard({ id, title, description, image }) {
  const navigate = useNavigate();

  return (
    <div className="course-card" onClick={() => navigate(`/course/${id}`)}>
      <div className="course-image">
        {image && <img src={image} alt={title} />}
      </div>
      <div className="course-body">
        <div className="course-info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button 
          className="btn-secondary"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/course/${id}`);
          }}
        >
          Button
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
