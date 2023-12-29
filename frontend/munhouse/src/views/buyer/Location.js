import React from "react";

function Location() {
  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-xl font-semibold mb-4">LOCATION</h2>
      <div style={{ height: "300px", width: "100%" }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: "2px solid #FFFFFF" }}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.0932844057397!2d-52.73608872441176!3d47.5659733907833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0ca39bae7b9be3%3A0x1ca72f1b8f8f7c6c!2s29%20Guy%20St%2C%20St.%20John's%2C%20NL%20A1B%201P7!5e0!3m2!1sen!2sca!4v1699493487128!5m2!1sen!2sca"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Location;
