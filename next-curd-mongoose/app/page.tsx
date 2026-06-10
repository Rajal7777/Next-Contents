"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  //Get users
  const fetchUser = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data.data);
 };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    alert("User created successfully");
    setName("");
    setEmail("");
  };

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
        <button
          className="border py-2 px-5"
          type="submit">Submit form</button>
      </form>
      <hr />
      <div>
        <h2>Users Contact</h2>
        {users.map((user) => (
          <div key={user._id}>{user.name}-{user.email}</div>
        ))}
      </div>
    </div>
  );
}
