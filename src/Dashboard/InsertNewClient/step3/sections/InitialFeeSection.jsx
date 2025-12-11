import { formatNumber } from "../utils/formatNumber";

const InitialFeeSection = ({
  installment,
  classInitialFee,
  setClassInitialFee,
  errors,
}) => (
  <div className="form-group" style={{ width: "250px" }}>
    <label>مبلغ اولیه آزمون و کلاس (تومان)</label>

    <input
      type="text"
      placeholder="مثلاً 500,000 تومان"
      value={
        installment === "خیر"
          ? "9,200,000"
          : formatNumber(classInitialFee)
      }
      disabled={installment === "خیر"}
      onChange={(e) => {
        const rawValue = e.target.value.replace(/,/g, "").replace(/\D/g, "");
        setClassInitialFee(rawValue);
      }}
      className={errors.classInitialFee ? "error" : ""}
    />

    {errors.classInitialFee && (
      <span className="error-text">{errors.classInitialFee}</span>
    )}
  </div>
);

export default InitialFeeSection;
