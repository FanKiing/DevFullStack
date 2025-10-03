// src/RegistrationForm.js
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    country: "",
    presentation: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Regex patterns
  const regex = {
    name: /^[A-Za-z\s]{3,}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  };

  const validate = () => {
    const newErrors = {};

    // Nom
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est obligatoire.";
    } else if (!regex.name.test(formData.name)) {
      newErrors.name =
        "Le nom doit contenir au moins 3 lettres et uniquement des caractères alphabétiques.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire.";
    } else if (!regex.email.test(formData.email)) {
      newErrors.email = "Format d'email invalide (ex: exemple@mail.com).";
    }

    // Mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est obligatoire.";
    } else if (!regex.password.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir min 6 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
    }

    // Genre
    if (!formData.gender) {
      newErrors.gender = "Veuillez choisir un genre.";
    }

    // Centres d'intérêt
    if (formData.interests.length === 0) {
      newErrors.interests = "Veuillez cocher au moins un centre d’intérêt.";
    }

    // Pays
    if (!formData.country) {
      newErrors.country = "Veuillez sélectionner un pays.";
    }

    // Présentation
    if (!formData.presentation.trim()) {
      newErrors.presentation = "La présentation est obligatoire.";
    } else if (formData.presentation.length < 10) {
      newErrors.presentation = "La présentation doit contenir au moins 10 caractères.";
    }

    setErrors(newErrors);

    // focus sur le premier champ invalide
    if (Object.keys(newErrors).length === 0) {
        setSubmitted(true);
    }
     
  };

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
     checked? setFormData({...formData,interests:[...formData.interests,value]}):
         setFormData({...formData,interests:formData.interests.filter(i=>i!==value)})
    
    } else {
      setFormData({...formData,[name]:value});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Formulaire d’inscription</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Nom */}
        <div className="mb-3">
          <label className="form-label">Nom et Prénom</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
            
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
           

          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Mot de passe */}
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
           
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Genre */}
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <div>
            {["Homme", "Femme"].map((g) => (
              <div className="form-check form-check-inline" key={g}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  
                />
                <label className="form-check-label">{g}</label>
              </div>
            ))}
          </div>
          {errors.gender && (
            <div className="text-danger">{errors.gender}</div>
          )}
        </div>

        {/* Centres d’intérêt */}
        <div className="mb-3">
          <label className="form-label">Centres d'intérêt</label>
          <div>
            {["Sport", "Lecture", "Voyage", "Programmation"].map((i) => (
              <div className="form-check form-check-inline" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="interests"
                  value={i}
                  checked={formData.interests.includes(i)}
                  onChange={handleChange}
                 
                />
                <label className="form-check-label">{i}</label>
              </div>
            ))}
          </div>
          {errors.interests && (
            <div className="text-danger">{errors.interests}</div>
          )}
        </div>

        {/* Pays */}
        <div className="mb-3">
          <label className="form-label">Pays</label>
          <select
            className={`form-select ${errors.country ? "is-invalid" : ""}`}
            name="country"
            value={formData.country}
            onChange={handleChange}
 
          >
            <option value="">--Choisir un pays--</option>
            {['Maroc','France','Espagne','Canada'].map((c,i)=>(
                 <option value={c} key={i}>{c}</option>
            ))}
        
          </select>
          {errors.country && (
            <div className="invalid-feedback">{errors.country}</div>
          )}
        </div>

        {/* Présentation */}
        <div className="mb-3">
          <label className="form-label">Présentation</label>
          <textarea
            className={`form-control ${
              errors.presentation ? "is-invalid" : ""
            }`}
            name="presentation"
            rows="3"
            value={formData.presentation}
            onChange={handleChange}
           
          />
          {errors.presentation && (
            <div className="invalid-feedback">{errors.presentation}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          S’inscrire
        </button>
      </form>

      {/* Message de succès */}
      {submitted && (
        <div className="alert alert-success mt-4">
          <h4>Inscription réussie !</h4>
          <div className="card mt-3">
            <div className="card-body">
              <p><strong>Nom :</strong> {formData.name}</p>
              <p><strong>Email :</strong> {formData.email}</p>
              <p><strong>Genre :</strong> {formData.gender}</p>
              <p><strong>Centres d’intérêt :</strong> {formData.interests.join(", ")}</p>
              <p><strong>Pays :</strong> {formData.country}</p>
              <p><strong>Présentation :</strong> {formData.presentation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
