import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFeeInfo } from "../../../../slices/formSlice";

export const usePaymentManager = () => {
  const dispatch = useDispatch();

  const [payments, setPayments] = useState([]);

  const addPayment = () => {
    setPayments((prev) => [
      ...prev,
      { type: "", amount: "", startDate: "", endDate: "" },
    ]);
  };

  const updatePayment = (index, field, value) => {
    setPayments((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  useEffect(() => {
    dispatch(updateFeeInfo({ payments }));
  }, [payments, dispatch]);

  return { payments, addPayment, updatePayment };
};
