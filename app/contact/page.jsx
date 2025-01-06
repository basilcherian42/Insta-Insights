'use client'
import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FiLoader } from 'react-icons/fi';
import CustomAlert4 from './CustomAlert4'; // Import CustomAlert4 component

function ContactForm() {
  const [state1, handleSubmit1] = useForm("mnqegrvj");
  const [state2, handleSubmit2] = useForm("xyyrbgpz"); // Add another state using useForm hook
  const [showAlert, setShowAlert] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.elements.message.value.trim()) {
      setEmptyMessage(true);
      setTimeout(() => setEmptyMessage(false), 2000);
      return;
    }
    
    if (e.target.elements.email.value === "vkoct2002@gmail.com") {
      await handleSubmit1(e);
    } else if (e.target.elements.email.value === "reckinator9@gmail.com") {
      await handleSubmit2(e);
    }

    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false); // Close the alert message
    document.getElementById('message').value = ''; // Clear the message box
  };

  return (
    <div className='gradient__bg'>
    <div className="p-10 bg-gradient-to-r bg-transparent rounded-lg shadow-lg text-white max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">CONTACT US</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Select Email Address</label>
          <select
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
          >
            <option value="vkoct2002@gmail.com">vkoct2002@gmail.com</option>
            <option value="reckinator9@gmail.com">reckinator9@gmail.com</option>
          </select>
          <ValidationError
            prefix="Email"
            field="email"
            errors={state1.errors || state2.errors} // Combine errors from both states
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            style={{ height: "150px", resize: "none" }} // Set resize property to none
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
          />
          {emptyMessage && <p className="text-red-500 text-sm">Message is empty</p>}
          <ValidationError
            prefix="Message"
            field="message"
            errors={state1.errors || state2.errors} // Combine errors from both states
            className="text-red-500 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={state1.submitting || state2.submitting} // Disable button while submitting
          className={`bg-orange-500 text-white py-2 px-6 rounded-md block mx-auto ${
            state1.submitting || state2.submitting ? 'opacity-50 cursor-not-allowed' : '' // Apply opacity and cursor style based on submitting state
          }`}
        >
          {(state1.submitting || state2.submitting) ? (
            <span className="flex items-center">
              <FiLoader className="animate-spin mr-2" /> Submitting
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
      {/* Replace the existing alert with CustomAlert4 */}
      {showAlert && (
        <CustomAlert4 message="We will contact you soon!" buttonText="Write Another Message" onClose={closeAlert} />
      )}
    </div>
  </div>
  );
}
  
function App() {
  return <ContactForm />;
}

export default App;
