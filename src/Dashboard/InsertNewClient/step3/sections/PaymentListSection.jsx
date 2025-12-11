import PaymentItem from "./PaymentItem";

const PaymentListSection = ({ payments, addPayment, updatePayment }) => (
  <>
    <button type="button" className="add-payment-btn" onClick={addPayment}>
      + افزودن روش پرداخت
    </button>

    {/* فقط یک GRID */}
    <div className="payment-grid">
      {payments.map((p, i) => (
        <PaymentItem
          key={i}
          p={p}
          index={i}
          updatePayment={updatePayment}
        />
      ))}
    </div>
  </>
);

export default PaymentListSection;
