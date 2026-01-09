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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "#ffffff",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: "#111827",
            }}
          >
            Employee Dashboard
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            Welcome back, <b>{user?.name}</b>
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            background: "#ef4444",
            color: "#ffffff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          Logout
        </button>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              padding: "12px 16px",
              background: "#ffffff",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <input
                placeholder="Search by name..."
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                  width: 220,
                }}
              />

              <select
                onChange={(e) => setGenderFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                }}
              >
                <option value="">All Genders</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <select
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                }}
              >
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
              style={{
                padding: "10px 18px",
                background: "#4f46e5",
                color: "#ffffff",
                border: "none",
                borderRadius: 10,
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(79,70,229,0.4)",
              }}
            >
              + Add Employee
            </button>
          </div>

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
