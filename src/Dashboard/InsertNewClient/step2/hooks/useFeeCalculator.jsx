import { useCallback, useEffect, useState } from "react";
import { calcClassFee } from "../utils/calcClassFee";


export const useFeeCalculator = (reg, subjects, calculateFees) => {
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

  }, [reg, subjects, calculateFees]);

  useEffect(() => {
    calcAll();
  }, [calcAll]);

  return fees;
};
