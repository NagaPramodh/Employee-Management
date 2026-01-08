import { useState, useEffect } from "react";

export default function EmployeeForm({ onSave, editingEmployee, onCancel }) {
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    dob: "",
    state: "",
    isActive: true,
    profileImage: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setForm(editingEmployee);
      setPreview(editingEmployee.profileImage);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, profileImage: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.gender || !form.dob || !form.state) {
      alert("All fields are required");
      return;
    }
    onSave(form);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        padding: 20,
        background: "#f9fafb",
        borderRadius: 12,
      }}
    >
      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>Full Name</label>
        <input
          style={inputStyle}
          placeholder="Enter full name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label style={labelStyle}>Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>State</label>
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select State</option>
          <option>Telangana</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <label style={labelStyle}>Status</label>
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        <span style={{ color: "#374151" }}>
          {form.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>Profile Image</label>
        <input type="file" onChange={handleImage} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              marginTop: 10,
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: "50%",
              border: "2px solid #e5e7eb",
            }}
          />
        )}
      </div>

      <div
        style={{
          gridColumn: "span 2",
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 20,
        }}
      >
        {editingEmployee && (
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              background: "#e5e7eb",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}

        <button
          onClick={handleSubmit}
          style={{
            padding: "8px 20px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {editingEmployee ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
const labelStyle = {
  fontSize: 14,
  color: "#374151",
  marginBottom: 4,
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  outline: "none",
};
