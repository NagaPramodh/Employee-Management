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
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button onClick={() => onDelete(emp.id)}>Delete</button>
              <button onClick={() => window.print()}>Print</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
