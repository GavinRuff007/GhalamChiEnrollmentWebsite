const SelectField = ({ label, required, name, value, onChange, options, error }) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>

      <select
        name={name}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "error" : ""}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default SelectField;
