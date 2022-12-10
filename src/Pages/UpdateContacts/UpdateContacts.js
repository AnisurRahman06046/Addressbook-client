import React from "react";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
const UpdateContacts = () => {
  const contact = useLoaderData();
  const { name, _id, location, phone } = contact;
  console.log(contact);
  const updateContact = (event) => {
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
    fetch(`http://localhost:5000/contacts/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contactInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Contact updated successfully");
        }
        console.log(data);
      });
  };
  return (
    <div className="mx-[500px] mt-10">
      <h1 className="text-xl font-semibold text-yellow-600">Update contact</h1>
      <form onSubmit={updateContact} className=" mt-5">
        <input type="text" placeholder="Name" name="name" defaultValue={name} />
        <br />
        <input
          className="mt-3"
          type="text"
          placeholder="Phone Number"
          name="phone"
          defaultValue={phone}
        />
        <br />
        <input
          className="mt-3"
          type="text"
          placeholder="Location"
          name="location"
          defaultValue={location}
        />{" "}
        <br />
        <button className="btn  btn-primary btn-xs mt-3">Update Contact</button>
      </form>
    </div>
  );
};

export default UpdateContacts;
