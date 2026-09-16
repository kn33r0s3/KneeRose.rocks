import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-content">
        <h1 className="header-title">Get In Touch</h1>
        <p className="contact-sub">
          Questions about a project, a collab, or just want to say hi? Send a
          message below or reach out directly.
        </p>

        <form
          className="contact-form"
          // Uses Formspree (https://formspree.io) — a free service that
          // forwards form submissions to your email with no backend server
          // required. Create a free account, make a form, and paste your
          // real form ID below in place of YOUR_FORM_ID.
          action="https://formspree.io/f/YOUR_FORM_ID"
          onSubmit={handleSubmit}
        >
          <input type="text" name="name" placeholder="Your name" required />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
          <textarea
            name="message"
            placeholder="Your message..."
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="kneerose-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "sent" && (
            <p className="contact-status contact-status-ok">
              Thanks — your message is on its way!
            </p>
          )}
          {status === "error" && (
            <p className="contact-status contact-status-error">
              Something went wrong. Try emailing directly instead, or double
              check the form ID in Contact.js.
            </p>
          )}
        </form>

        <div className="contact-direct">
          <a
            href="mailto:hello@kneerose.rocks"
            className="kneerose-btn-two contact-email"
          >
            hello@kneerose.rocks
          </a>
          <div className="contact-socials">
            <a
              href="https://www.instagram.com/knee_raws/"
              className="f-social"
            >
              <i className="fa-brands fa-instagram"></i>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/niraz.paudyal/"
              className="f-social"
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook</span>
            </a>
            <a href="https://twitter.com/kn33r0s3" className="f-social">
              <i className="fa-brands fa-twitter"></i>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
