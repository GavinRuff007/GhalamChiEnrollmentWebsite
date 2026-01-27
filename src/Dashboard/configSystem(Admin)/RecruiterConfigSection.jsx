import React, { useState } from "react";
import {
  useGetRecruitersQuery,
  useAddRecruiterMutation,
} from "../../services/apiSlice";
import "./ConfigLoginSystem.css";

const RecruiterConfigSection = () => {
  const { data: recruiters = [], isLoading } = useGetRecruitersQuery();
  const [addRecruiter, { isLoading: isAdding }] =
    useAddRecruiterMutation();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) {
      setError("نام مسئول جذب الزامی است");
      return;
    }

    try {
      await addRecruiter({ name: name.trim() }).unwrap();
      setName("");
      setError("");
    } catch {
      setError("خطا در ثبت (احتمالاً نام تکراری است)");
    }
  };

  return (
    <>
      <div className="content">

        <div className="card">
          <h3 className="section-title">مسئول جذب</h3>
          <div className="divider"></div>

          <input
            type="text"
            placeholder="نام مسئول جذب"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={handleAdd} disabled={isAdding}>
            {isAdding ? "در حال ثبت..." : "افزودن"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        <div className="card">
          <h3 className="section-title">مسئول جذب</h3>
          <div className="divider"></div>

          {isLoading ? (
            <p>در حال بارگذاری...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>نام</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((r, index) => (
                  <tr key={r.id}>
                    <td>{index + 1}</td>
                    <td>{r.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      <br />
    </>
  );
};

export default RecruiterConfigSection;
