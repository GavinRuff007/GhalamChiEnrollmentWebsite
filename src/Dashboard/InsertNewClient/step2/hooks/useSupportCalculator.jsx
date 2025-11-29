import { useEffect } from "react";
import { calcSupportFee } from "../utils/calcSupportFee";

export const useSupportCalculator = (reg, supporters, dispatch) => {
  useEffect(() => {
    if (!reg.specialSupport) return;

    const s = reg.supportInfo;
    const supporter = supporters.find((sp) => sp.id === s?.supporterId);

    const result = calcSupportFee(supporter, s?.startDate, s?.endDate);
    if (!result) return;

    if (
      s.fee === result.fee &&
      s.days === result.days &&
      s.dailyPrice === result.dailyPrice
    ) {
      return;
    }

    dispatch({
      supportInfo: { ...s, ...result },
    });
  }, [
    reg.specialSupport,
    reg.supportInfo?.supporterId,
    reg.supportInfo?.startDate,
    reg.supportInfo?.endDate,
    supporters,
    dispatch,
  ]);
};
