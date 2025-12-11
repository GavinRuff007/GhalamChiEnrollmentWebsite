import { useState, useEffect, useCallback } from "react";
import { updateFeeInfo } from "../../../../slices/formSlice";
import { calcClassFee } from "../utils/calcClassFee";


export const useFeeCalculator = (reg, subjects, calculateFees, dispatch) => {
  const [fees, setFees] = useState(null);

  const calcAll = useCallback(async () => {
    if (!subjects?.length) return;
    if (!reg) return;

    const classSum = calcClassFee(reg.classInfo || [], subjects);

    let resp;
    try {
      resp = await calculateFees({
        typeOption: reg.typeOption,
        examCount: reg.examCount,
        discountExam: reg.discountExam,
        discountClass: reg.discountClass,
        classCount: reg.classCount,
        bookVoucher: reg.bookVoucher,
        specialSupport: reg.specialSupport,
        selectedClassFee: classSum,
        supportFee: reg.supportInfo?.fee || 0,
      }).unwrap();
    } catch {
      return;
    }

    const newFees = {
      ...resp,
      class_fee: classSum,
      support_fee: reg.supportInfo?.fee || 0,
      total_fee:
        classSum +
        (resp.exam_fee || 0) +
        (resp.book_fee || 0) +
        (reg.supportInfo?.fee || 0),
    };

    setFees(newFees);

    // ⬅️⬅️ مهم‌ترین چیز:
    dispatch(updateFeeInfo({ total_fee: newFees.total_fee }));
  }, [reg, subjects, calculateFees, dispatch]);

  useEffect(() => {
    calcAll();
  }, [calcAll]);

  return fees;
};
