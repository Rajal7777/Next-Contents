"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    console.log(data);
    alert("User created successfully");
    setName("");
    setEmail("");
  }

  return (
    <div className="flex flex-col  justify-center items-center ">
      <h1>Create user</h1>
      <form onSubmit={handleSubmit}
      className="text-center">
        <input
         className="text-center p-2 border"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /> <br />
        <input
         className="text-center p-2 border"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> <br />
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
}
