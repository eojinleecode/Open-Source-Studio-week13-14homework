
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6924597a3ad095fb8473d8b4.mockapi.io/students"; // 네 주소로

function List() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");

 
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const majorRef = useRef(null);
  const emailRef = useRef(null);

  const navigate = useNavigate();

  
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // create validation (useRef)
  const validateCreate = () => {
    if (!nameRef.current.value.trim()) {
      alert("Name is required");
      nameRef.current.focus();
      return false;
    }
    if (!ageRef.current.value.trim() || isNaN(Number(ageRef.current.value))) {
      alert("Age must be a number");
      ageRef.current.focus();
      return false;
    }
    if (!majorRef.current.value.trim()) {
      alert("Major is required");
      majorRef.current.focus();
      return false;
    }
    if (!emailRef.current.value.trim()) {
      alert("Email is required");
      emailRef.current.focus();
      return false;
    }
    return true;
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateCreate()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, major, email }),
      });
      const newStudent = await res.json();
      setStudents((prev) => [...prev, newStudent]);

      setName("");
      setAge("");
      setMajor("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Failed to create student.");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  return (
    <div>
      {/* Create Form */}
      <h2>Create Student</h2>
      <form className="mb-4" onSubmit={handleCreate}>
        <input
          ref={nameRef}
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          ref={ageRef}
          className="form-control mb-2"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          ref={majorRef}
          className="form-control mb-2"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <input
          ref={emailRef}
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>

      <hr />

      {/* List */}
      <h2>Student List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Major</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.major}</td>
                <td>{s.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-1"
                    onClick={() => navigate(`/detail/${s.id}`)}
                  >
                    Detail
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => navigate(`/update/${s.id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5">No data.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List;
