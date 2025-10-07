import { useState } from "react"; 

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    country: "",
    presentation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let newInterests = [...form.interests];
      if (checked) newInterests.push(value);
      else newInterests = newInterests.filter((i) => i !== value);
      setForm({ ...form, interests: newInterests });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    let errs = {};

    if (!form.name.trim()) errs.name = "Nom et prénom obligatoires";
    else if (form.name.length < 3) errs.name = "Minimum 3 caractères";
    else if (!/^[A-Za-z\s]+$/.test(form.name))
      errs.name = "Uniquement lettres et espaces";

    if (!form.email) errs.email = "Email obligatoire";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email invalide";

    if (!form.password) errs.password = "Mot de passe obligatoire";
    else if (form.password.length < 6)
      errs.password = "Minimum 6 caractères";
    else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(form.password)
    )
      errs.password =
        "Doit contenir majuscule, minuscule, chiffre et caractère spécial";

    if (!form.gender) errs.gender = "Choisir un genre";

    if (form.interests.length === 0)
      errs.interests = "Choisir au moins un centre d’intérêt";

    if (!form.country) errs.country = "Choisir un pays";

    if (!form.presentation.trim()) errs.presentation = "Présentation obligatoire";
    else if (form.presentation.length < 10)
      errs.presentation = "Minimum 10 caractères";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      alert("Formulaire valide ✅");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Formulaire d'inscription</h2>
      <form onSubmit={handleSubmit}>
        {/* Nom */}
        <div className="mb-3">
          <label className="form-label">Nom et prénom</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            name="password"
            value={form.password}
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
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                value="Homme"
                checked={form.gender === "Homme"}
                onChange={handleChange}
              />
              <label className="form-check-label">Homme</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                value="Femme"
                checked={form.gender === "Femme"}
                onChange={handleChange}
              />
              <label className="form-check-label">Femme</label>
            </div>
          </div>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        {/* Centres d’intérêt */}
        <div className="mb-3">
          <label className="form-label">Centres d’intérêt</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              value="Sport"
              checked={form.interests.includes("Sport")}
              onChange={handleChange}
              name="interests"
            />
            <label className="form-check-label">Sport</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              value="Musique"
              checked={form.interests.includes("Musique")}
              onChange={handleChange}
              name="interests"
            />
            <label className="form-check-label">Musique</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              value="Voyage"
              checked={form.interests.includes("Voyage")}
              onChange={handleChange}
              name="interests"
            />
            <label className="form-check-label">Voyage</label>
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
            value={form.country}
            onChange={handleChange}
          >
            <option value="">-- Choisir un pays --</option>
            <option value="Maroc">Maroc</option>
            <option value="France">France</option>
            <option value="Espagne">Espagne</option>
          </select>
          {errors.country && (
            <div className="invalid-feedback">{errors.country}</div>
          )}
        </div>

        {/* Présentation */}
        <div className="mb-3">
          <label className="form-label">Présentation</label>
          <textarea
            className={`form-control ${errors.presentation ? "is-invalid" : ""}`}
            name="presentation"
            rows="3"
            value={form.presentation}
            onChange={handleChange}
          ></textarea>
          {errors.presentation && (
            <div className="invalid-feedback">{errors.presentation}</div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default App;
