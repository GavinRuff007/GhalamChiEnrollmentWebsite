import InputField from "../utils/InputField";
import SelectField from "../utils/SelectField";
import DateField from "../utils/DateField";

const PersonalInfoSection = ({ formData, errors, update }) => {

  const handleNationalCode = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) update({ nationalCode: cleaned });
  };

  return (
    <form className="student-form">
      <div className="form-grid">

        <InputField
          label="کد مالی"
          required
          name="code"
          value={formData.code}
          onChange={(v) => update({ code: v })}
          error={errors.code}
        />

        <DateField
          label="تاریخ ثبت‌نام"
          required
          value={formData.date}
          onChange={(v) => update({ date: v })}
          error={errors.date}
        />

        <InputField
          label="نام"
          required
          name="name"
          value={formData.name}
          onChange={(v) => update({ name: v })}
          error={errors.name}
        />

        <InputField
          label="نام خانوادگی"
          required
          name="family"
          value={formData.family}
          onChange={(v) => update({ family: v })}
          error={errors.family}
        />

        <SelectField
          label="پایه تحصیلی"
          required
          name="grade"
          value={formData.grade}
          onChange={(v) => update({ grade: v })}
          options={[
            { value: "", label: "انتخاب کنید" },
            { value: "1", label: "پایه اول" },
            { value: "2", label: "پایه دوم" },
            { value: "3", label: "پایه سوم" },
            { value: "4", label: "پایه چهارم" },
            { value: "5", label: "پایه پنجم" },
            { value: "6", label: "پایه ششم" },
            { value: "7", label: "پایه هفتم" },
            { value: "8", label: "پایه هشتم" },
            { value: "9", label: "پایه نهم" },
            { value: "10-R", label: "۱۰ ریاضی" },
            { value: "11-R", label: "۱۱ ریاضی" },
            { value: "12-R", label: "۱۲ ریاضی" },
            { value: "10-T", label: "۱۰ تجربی" },
            { value: "11-T", label: "۱۱ تجربی" },
            { value: "12-T", label: "۱۲ تجربی" },
            { value: "10-H", label: "۱۰ انسانی" },
            { value: "11-H", label: "۱۱ انسانی" },
            { value: "12-H", label: "۱۲ انسانی" },
          ]}
          error={errors.grade}
        />

        <SelectField
          label="جنسیت"
          required
          name="gender"
          value={formData.gender}
          onChange={(v) => update({ gender: v })}
          options={[
            { value: "", label: "انتخاب کنید" },
            { value: "پسر", label: "پسر" },
            { value: "دختر", label: "دختر" },
          ]}
          error={errors.gender}
        />

        <InputField
          label="تلفن دانش‌آموز"
          required
          name="phone1"
          value={formData.phone1}
          onChange={(v) => update({ phone1: v })}
          error={errors.phone1}
        />

        <InputField
          label="تلفن منزل"
          name="homePhone"
          value={formData.homePhone}
          onChange={(v) => update({ homePhone: v })}
        />

        <InputField
          label="تلفن مادر"
          name="motherPhone"
          value={formData.motherPhone}
          onChange={(v) => update({ motherPhone: v })}
        />

        <InputField
          label="مدرسه"
          name="school"
          value={formData.school}
          onChange={(v) => update({ school: v })}
        />

        <InputField
          label="معدل"
          name="avg"
          value={formData.avg}
          onChange={(v) => update({ avg: v })}
        />

        <InputField
          label="کد ملی"
          required
          name="nationalCode"
          value={formData.nationalCode}
          onChange={handleNationalCode}
          error={errors.nationalCode}
        />

      </div>
    </form>
  );
};

export default PersonalInfoSection;
