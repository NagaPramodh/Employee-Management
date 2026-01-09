export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <table width="100%" border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>State</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>
              <img src={emp.profileImage} width="40" alt="" />
            </td>
            <td>{emp.fullName}</td>
            <td>{emp.gender}</td>
            <td>{emp.dob}</td>
            <td>{emp.state}</td>
            <td>{emp.isActive ? "Active" : "Inactive"}</td>
            <td
              style={{
                whiteSpace: "nowrap",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <button
                  onClick={() => onEdit(emp)}
                  style={{
                    padding: "6px 12px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(emp.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => window.print()}
                  style={{
                    padding: "6px 12px",
                    background: "#059669",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Print
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
