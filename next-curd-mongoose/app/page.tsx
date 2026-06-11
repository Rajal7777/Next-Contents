"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  console.log("data", users);
  console.log("id", editId);

 //Get users
  const fetchUser = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.data);
  };

  //Load data
  useEffect(() => {
    fetchUser();
  }, []);

  //Create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    //update
    if (editId) {
      await fetch(`/api/users/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      setEditId(null);
      alert("edited successfully");

      setName("");
      setEmail("");

      fetchUser();
    } else {
      const res = await fetch("/api/users", {
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

      fetchUser();
    }
  };

  //Edit
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user._id);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("api/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email }),
  //   });

  //   const data = await res.json();
  //   console.log(data);
  //   alert("User created successfully");
  //   setName("");
  //   setEmail("");
  // };

  return (
    <div>
      <h1>{editId ? "Edit User" : "Create user"}</h1>
      <form onSubmit={handleSubmit} >
        <input
         type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /> <br />

        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <br /> <br />

        <button className="border py-2 px-5" type="submit">
          {editId ? "Edit User" : "Create user"}
        </button>
      </form>

      <div>
        <h2>Users Contact</h2>
        {users.map((user) => (
          <div key={user._id}>
            {user.name}-{user.email}
            <button 
            className="ml-6"
            onClick={() => handleEdit(user)}>
              edit button
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
