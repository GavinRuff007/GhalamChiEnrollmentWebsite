import React from "react";
import InitialFeeSection from "./sections/InitialFeeSection";
import PaymentListSection from "./sections/PaymentListSection";
import { usePaymentManager } from "./hooks/usePaymentManager";
import "./FeeInfoStep.css";

const FeeInfoStep = (props) => {
  const { fees } = props;
  const { payments, addPayment, updatePayment } = usePaymentManager();

  const total = fees?.total_fee || 0;

  const paymentsTotal = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const remain = total - paymentsTotal;

  return (
    <div className="next-page" id="fee-info-section">
      <h3>مرحله سوم: اطلاعات شهریه</h3>

      <form className="student-form">
        <div className="form-grid">
          <InitialFeeSection {...props} />
        </div>

        <div className="summary-box">
          <h4>جمع کل: {total.toLocaleString("fa-IR")} تومان</h4>

          <div
            style={{
              marginTop: "10px",
              fontSize: "20px",
              fontWeight: "bold",
              color: remain === 0 ? "green" : "red",
            }}
          >
            باقیمانده: {remain.toLocaleString("fa-IR")} تومان
          </div>
        </div>

        <PaymentListSection
          payments={payments}
          addPayment={addPayment}
          updatePayment={updatePayment}
        />
      </form>
    </div>
  );
};

export default FeeInfoStep;
