"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";

const ManageStudents = () => {
  const [id, setId] = useState("");
  const [num, setNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api");
        setNum(result.data);
      } catch {}
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/api", { stuNum: id });
    } catch {}
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/${id}`);
    } catch {}
  };

  return (
    <div className="m-10 flex flex-col gap-2" dir="rtl">
      <h1 data-testid="h1">تعداد افراد : {num}</h1>
      <input
        className="rounded-full p-3"
        type="text"
        placeholder="شماره دانشجویی"
        data-testid="id-input"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className="h-8 rounded-full bg-sky-500"
        data-testid="submit-button"
        onClick={handleSubmit}
      >
        اضافه
      </button>
      <button
        className="h-8 rounded-full bg-sky-500"
        data-testid="delete-button"
        onClick={handleDelete}
      >
        حذف
      </button>
    </div>
  );
};

export default ManageStudents;
