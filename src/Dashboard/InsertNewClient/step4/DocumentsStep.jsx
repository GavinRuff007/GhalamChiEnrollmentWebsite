import React from "react";
import "../InsertNewClient.css";

const DocumentsStep = ({ uploadedFiles, setUploadedFiles }) => {

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="next-page">
      <h3>مرحله چهارم: مدارک مستند</h3>
      <p>در این مرحله فایل‌های مربوط به مدارک را آپلود کنید.</p>

      {/* بخش آپلود */}
      <div className="upload-section">
        <label
          htmlFor="fileUpload"
          className="upload-label"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            border: "1px dashed #888",
            borderRadius: "8px",
            background: "#f8f8f8",
            cursor: "pointer",
          }}
        >
          📎 انتخاب فایل‌ها
        </label>
        <input
          id="fileUpload"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {/* لیست فایل‌های آپلودشده */}
      {uploadedFiles?.length > 0 && (
        <div
          className="uploaded-files"
          style={{
            marginTop: "20px",
            borderTop: "1px solid #ccc",
            paddingTop: "15px",
          }}
        >
          <h4>فایل‌های انتخاب‌شده:</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  background: "#f4f4f4",
                }}
              >
                <span>
                  📄 {file.name}{" "}
                  <small style={{ color: "#666" }}>
                    ({(file.size / 1024).toFixed(1)} KB)
                  </small>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentsStep;
