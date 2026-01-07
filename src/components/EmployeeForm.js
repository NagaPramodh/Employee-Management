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
    <div style={{ padding: 20, background: "#f9f9f9", marginBottom: 20 }}>
      <h3>{editingEmployee ? "Edit" : "Add"} Employee</h3>

      <input
        placeholder="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
      />

      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input type="date" name="dob" value={form.dob} onChange={handleChange} />

      <select name="state" value={form.state} onChange={handleChange}>
        <option value="">Select State</option>
        <option>Telangana</option>
        <option>Maharashtra</option>
        <option>Karnataka</option>
      </select>

      <label>
        Active:
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
      </label>

      <br />
      <input type="file" onChange={handleImage} />

      {preview && <img src={preview} width="80" alt="" />}

      <br />
      <button onClick={handleSubmit}>
        {editingEmployee ? "Update" : "Add"}
      </button>
      {editingEmployee && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}
