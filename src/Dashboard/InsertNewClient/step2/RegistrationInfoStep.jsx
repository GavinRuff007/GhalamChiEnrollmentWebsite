import { useDispatch, useSelector } from "react-redux";
import {
  useGetClassesQuery,
  useGetSupportersQuery,
  useCalculateFeesMutation,
} from "../../../services/apiSlice";

import { updateRegistrationInfo } from "../../../slices/formSlice";

import { useSupportCalculator } from "./hooks/useSupportCalculator";
import { useFeeCalculator } from "./hooks/useFeeCalculator";

import TypeSection from "./sections/TypeSection";
import ClassesSection from "./sections/ClassesSection";
import SupportSection from "./sections/SupportSection";
import SummarySection from "./sections/SummarySection";

import "./RegistrationInfoStep.css";

const RegistrationInfoStep = () => {
  const dispatch = useDispatch();

  const { personalInfo, registrationInfo: reg, errors } = useSelector(
    (state) => state.form
  );
  const { grade } = personalInfo ?? {};

  const { data: subjects = [] } = useGetClassesQuery(grade, {
    skip: !grade,
  });

  const { data: supporters = [] } = useGetSupportersQuery();

  const [calculateFees] = useCalculateFeesMutation();

  useSupportCalculator(reg, supporters, (obj) =>
    dispatch(updateRegistrationInfo(obj))
  );

  const fees = useFeeCalculator(reg, subjects, calculateFees);
  
  return (
    <div className="next-page">
      <h3>مرحله دوم: اطلاعات ثبت‌نام</h3>
      <form className="student-form">
        <TypeSection reg={reg} errors={errors} dispatch={dispatch} />
        {reg.classCount > 0 && (
          <ClassesSection reg={reg} subjects={subjects} dispatch={dispatch} />
        )}
        <SupportSection
          reg={reg}
          supporters={supporters}
          dispatch={dispatch}
        />
        <SummarySection fees={fees} />
      </form>
    </div>
  );
};
export default RegistrationInfoStep;
