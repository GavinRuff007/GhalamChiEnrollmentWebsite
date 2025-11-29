const InputField = ({ label, required, name, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>

      <input
        name={name}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "error" : ""}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default InputField;
