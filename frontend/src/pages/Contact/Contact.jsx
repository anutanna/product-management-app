import React from "react";
import Header from "../../components/Header";

const Contact = () => {
  return (
    <>
      <section>

        <h1>Contact Page</h1>
        <p>This is the contact page where you can reach us.</p>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    </>
  );
}   
export default Contact;