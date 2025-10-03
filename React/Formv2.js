// src/RegistrationForm.js
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const countryRef = useRef();
  const presentationRef = useRef();
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([]);

  // États pour erreurs et succès
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Regex patterns
  const regex = {
    name: /^[A-Za-z\s]{3,}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  };

  const validate = () => {
    const newErrors = {};

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const country = countryRef.current.value;
    const presentation = presentationRef.current.value.trim();

    // Nom
    if (!name) {
      newErrors.name = "Le nom est obligatoire.";
    } else if (!regex.name.test(name)) {
      newErrors.name =
        "Le nom doit contenir au moins 3 lettres et uniquement des caractères alphabétiques.";
    }

    // Email
    if (!email) {
      newErrors.email = "L'email est obligatoire.";
    } else if (!regex.email.test(email)) {
      newErrors.email = "Format d'email invalide (ex: exemple@mail.com).";
    }

    // Mot de passe
    if (!password) {
      newErrors.password = "Le mot de passe est obligatoire.";
    } else if (!regex.password.test(password)) {
      newErrors.password =
        "Le mot de passe doit contenir min 6 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
    }

    // Genre
    if (!gender) {
      newErrors.gender = "Veuillez choisir un genre.";
    }

    // Centres d’intérêt
    if (interests.length === 0) {
      newErrors.interests = "Veuillez cocher au moins un centre d’intérêt.";
    }

    // Pays
    if (!country) {
      newErrors.country = "Veuillez sélectionner un pays.";
    }

    // Présentation
    if (!presentation) {
      newErrors.presentation = "La présentation est obligatoire.";
    } else if (presentation.length < 10) {
      newErrors.presentation =
        "La présentation doit contenir au moins 10 caractères.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmittedData({
        name,
        email,
        password,
        gender,
        interests,
        country,
        presentation,
      });
    } else {
      setSubmittedData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((i) => i !== value));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Formulaire d’inscription (Refs + State mixte)</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Nom */}
        <div className="mb-3">
          <label className="form-label">Nom et Prénom</label>
          <input
            type="text"
            ref={nameRef}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            ref={emailRef}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
            ref={passwordRef}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label">{g}</label>
              </div>
            ))}
          </div>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
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
                  value={i}
                  checked={interests.includes(i)}
                  onChange={handleInterestChange}
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
            ref={countryRef}
          >
            <option value="">--Choisir un pays--</option>
            {["Maroc", "France", "Espagne", "Canada"].map((c, i) => (
              <option value={c} key={i}>
                {c}
              </option>
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
            rows="3"
            ref={presentationRef}
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
      {submittedData && (
        <div className="alert alert-success mt-4">
          <h4>Inscription réussie !</h4>
          <div className="card mt-3">
            <div className="card-body">
              <p>
                <strong>Nom :</strong> {submittedData.name}
              </p>
              <p>
                <strong>Email :</strong> {submittedData.email}
              </p>
              <p>
                <strong>Genre :</strong> {submittedData.gender}
              </p>
              <p>
                <strong>Centres d’intérêt :</strong>{" "}
                {submittedData.interests.join(", ")}
              </p>
              <p>
                <strong>Pays :</strong> {submittedData.country}
              </p>
              <p>
                <strong>Présentation :</strong> {submittedData.presentation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
