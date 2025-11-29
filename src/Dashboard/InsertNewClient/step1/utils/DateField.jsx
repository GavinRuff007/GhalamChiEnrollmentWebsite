import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DateField = ({ label, required, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={value || ""}
        onChange={(d) => onChange(d?.format?.("YYYY/MM/DD"))}
        inputClass={`custom-input ${error ? "error" : ""}`}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default DateField;
