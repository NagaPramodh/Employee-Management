import { useEffect, useState, useContext } from "react";
import { api } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "../components/Modal";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { logout, user } = useContext(AuthContext);
  const filteredEmployees = employees.filter((emp) => {
    const matchName = emp.fullName.toLowerCase().includes(search.toLowerCase());
    const matchGender = genderFilter ? emp.gender === genderFilter : true;
    const matchStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
        ? emp.isActive
        : !emp.isActive;

    return matchName && matchGender && matchStatus;
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    const data = await api.getEmployees();
    setEmployees(data);
    setLoading(false);
  };
  const handleSave = (emp) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((e) =>
          e.id === editingEmployee.id ? { ...emp, id: e.id } : e
        )
      );
      setEditingEmployee(null);
    } else {
      setEmployees([...employees, { ...emp, id: Date.now() }]);
    }
  };

  const activeCount = employees.filter((e) => e.isActive).length;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome, {user?.name}</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <hr />

      <div style={{ display: "flex", gap: 20 }}>
        <div style={cardStyle}>
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Active</h3>
          <p>{activeCount}</p>
        </div>
        <div style={cardStyle}>
          <h3>Inactive</h3>
          <p>{employees.length - activeCount}</p>
        </div>
      </div>

      <br />

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <>
          <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
            <input
              placeholder="Search by name"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select onChange={(e) => setGenderFilter(e.target.value)}>
              <option value="">All Genders</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            onClick={() => {
              setEditingEmployee(null);
              setShowModal(true);
            }}
          >
            + Add Employee
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: 10,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {editingEmployee ? "Edit Employee" : "Add Employee"}
                  </h2>

                  <span
                    onClick={() => setShowModal(false)}
                    style={{
                      fontSize: 22,
                      cursor: "pointer",
                      color: "#6b7280",
                    }}
                  >
                    ✖
                  </span>
                </div>

                <div
                  style={{
                    background: "#f9fafb",
                    padding: 20,
                    borderRadius: 10,
                    boxShadow: "0 0 0 1px #e5e7eb",
                  }}
                >
                  <EmployeeForm
                    onSave={(emp) => {
                      handleSave(emp);
                      setShowModal(false);
                    }}
                    editingEmployee={editingEmployee}
                    onCancel={() => {
                      setEditingEmployee(null);
                      setShowModal(false);
                    }}
                  />
                </div>
              </div>
            </Modal>
          )}

          <EmployeeTable
            employees={filteredEmployees}
            onEdit={(emp) => {
              setEditingEmployee(emp);
              setShowModal(true);
            }}
            onDelete={(id) => {
              if (window.confirm("Delete this employee?")) {
                setEmployees(employees.filter((e) => e.id !== id));
              }
            }}
          />
        </>
      )}
    </div>
  );
}

const cardStyle = {
  padding: 20,
  background: "#f3f3f3",
  borderRadius: 8,
  minWidth: 150,
};
