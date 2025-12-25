import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRegistrationInfo } from "../../../../slices/formSlice";

export const useSupportCalculator = (reg) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reg.specialSupport) {
      if (reg.supportInfoList?.length) {
        dispatch(
          updateRegistrationInfo({
            supportInfoList: [],
          })
        );
      }
    }
  }, [reg.specialSupport, reg.supportInfoList, dispatch]);
};
