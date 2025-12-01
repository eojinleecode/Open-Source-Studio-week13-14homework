
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://6924597a3ad095fb8473d8b4.mockapi.io/students";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);   // 전체 필드 상태
  const [changeCount, setChangeCount] = useState(0);

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const majorRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load data.");
      }
    };
    fetchOne();
  }, [id]);

  const validate = () => {
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
    return true;
  };

 
  const handleChange = async (field, value) => {
    if (!student) return;

    const updated = { ...student, [field]: value };
    setStudent(updated);
    setChangeCount((prev) => prev + 1);

    if (!validate()) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Student (ID: {id})</h2>
      <p>Changes made: {changeCount}</p>

      <input
        ref={nameRef}
        className="form-control mb-2"
        value={student.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        ref={ageRef}
        className="form-control mb-2"
        value={student.age || ""}
        onChange={(e) => handleChange("age", e.target.value)}
      />
      <input
        ref={majorRef}
        className="form-control mb-2"
        value={student.major || ""}
        onChange={(e) => handleChange("major", e.target.value)}
      />
      <input
        ref={emailRef}
        className="form-control mb-2"
        value={student.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <button className="btn btn-secondary mt-2" onClick={() => navigate("/list")}>
        Back to List
      </button>
    </div>
  );
}

export default Update;
