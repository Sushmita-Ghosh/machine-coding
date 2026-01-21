import React from "react";

const Profile = ({ formData, setFormData }) => {
  const {
    firstName,
    lastName,
    email,
    country,
    streetAddress,
    city,
    stateProvince,
    postalCode,
  } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="profile-form-container">
      {/* Profile form fields would go here */}
      <div className="profile-form-fields">
        <label className="label">First Name:</label>
        <input
          className="input-text"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
        />
        <label className="label">Last Name:</label>
        <input
          className="input-text"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
        />
        <label className="label">Email:</label>
        <input
          className="input-text"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <label className="label">Country:</label>
        {/* < input className='input-text' type="text" name="country" />
         */}
        <select
          className="input-text"
          name="country"
          value={country}
          onChange={handleInputChange}
        >
          <option value="">Select Country</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="India">India</option>
          <option value="China">China</option>
          <option value="Japan">Japan</option>
          <option value="Brazil">Brazil</option>
        </select>
        <label className="label">Street Address:</label>
        <input
          className="input-text"
          type="text"
          name="streetAddress"
          value={streetAddress}
          onChange={handleInputChange}
        />
        <label>City:</label>

        <input
          className="input-text"
          type="text"
          name="city"
          value={city}
          onChange={handleInputChange}
        />
        <label className="label">State/Province:</label>
        <input
          className="input-text"
          type="text"
          name="stateProvince"
          value={stateProvince}
          onChange={handleInputChange}
        />
        <label className="label">Postal Code:</label>
        <input
          className="input-text"
          type="text"
          name="postalCode"
          value={postalCode}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Profile;
