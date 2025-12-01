// src/components/Pages/Detail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://6924597a3ad095fb8473d8b4.mockapi.io/students";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load detail.");
      }
    };
    fetchOne();
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2>Student Detail</h2>
      <p>
        <b>Name:</b> {student.name}
      </p>
      <p>
        <b>Age:</b> {student.age}
      </p>
      <p>
        <b>Major:</b> {student.major}
      </p>
      <p>
        <b>Email:</b> {student.email}
      </p>

      <button className="btn btn-secondary me-2" onClick={() => navigate("/list")}>
        Back to List
      </button>
      <button className="btn btn-warning" onClick={() => navigate(`/update/${id}`)}>
        Edit
      </button>
    </div>
  );
}

export default Detail;
