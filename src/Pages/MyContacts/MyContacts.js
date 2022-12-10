import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
const MyContacts = () => {
  const { data: contacts = [], refetch } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/contacts", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleAddContact = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const contactInfo = {
      name: name,
      phone: phone,
      location: location,
    };
    console.log(contactInfo);

    fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contactInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Contact added successfully");
          refetch();
        }
        console.log(data);
      });
  };
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/contacts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted Seccuessfully");
          refetch();
        }
        // console.log(data);
      });
  };
  return (
    <div className="grid grid-cols-4 mx-auto my-5 container">
      <div className="col-span-1">
        <h1 className="text-xl font-semibold text-yellow-600">
          Add a new contact
        </h1>
        <form onSubmit={handleAddContact} className=" mt-5">
          <input type="text" placeholder="Name" name="name" />
          <br />
          <input
            className="mt-3"
            type="text"
            placeholder="Phone Number"
            name="phone"
          />
          <br />
          <input
            className="mt-3"
            type="text"
            placeholder="Location"
            name="location"
          />{" "}
          <br />
          <button className="btn  btn-primary btn-xs mt-3">Add Contact</button>
        </form>
      </div>

      <div className="col-span-3">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr key={contact._id}>
                  <th>{i + 1}</th>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.location}</td>
                  <td>
                    <Link
                      onClick={() => handleDelete(contact._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Delete
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/updatecontacts/${contact._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyContacts;
