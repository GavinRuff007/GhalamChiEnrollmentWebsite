import { useSelector, useDispatch } from "react-redux";
import { updatePersonalInfo } from "../../../slices/formSlice";

import PersonalInfoSection from "./section/PersonalInfoSection";
import "./PersonalInfoStep.css";

const PersonalInfoStep = () => {
  const dispatch = useDispatch();

  const formData = useSelector((s) => s.form.personalInfo);
  const errors = useSelector((s) => s.form.errors);

  const update = (obj) => {
    dispatch(updatePersonalInfo(obj));
  };

  return (
    <>
      <h3>فرم اطلاعات شخصی</h3>

      <PersonalInfoSection
        formData={formData}
        errors={errors}
        update={update}
      />
    </>
  );
};

export default PersonalInfoStep;