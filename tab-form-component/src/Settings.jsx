import React from "react";

const Settings = ({ formData, setFormData }) => {
  const { newsletter, notifications, personalizedAds } = formData;

  /** Newsletter should be true false based on user selection */
  /** true & false options for newsletter */

  const handleRadioChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleNewsletterChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "true",
    }));
  };

  const handleNotificationsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "true",
    }));
  };

  return (
    <div className="settings-form-container">
      {/* Settings form fields would go here */}
      <div className="settings-form-fields">
        {/* Newsletter */}
        <div>
          <label className="label">Newsletter:</label>

          <label className="label">
            <input
              type="radio"
              name="newsletter"
              value="true"
              checked={newsletter === true}
              onChange={handleNewsletterChange}
            />
            Yes
          </label>

          <label className="label">
            <input
              type="radio"
              name="newsletter"
              value="false"
              checked={newsletter === false}
              onChange={handleNewsletterChange}
            />
            No
          </label>
        </div>

        {/* Notifications */}

        <div>
          <label className="label">Notifications:</label>

          <label className="label">
            <input
              type="radio"
              name="notifications"
              value="true"
              checked={notifications === true}
              onChange={handleNotificationsChange}
            />
            Yes
          </label>

          <label className="label">
            <input
              type="radio"
              name="notifications"
              value="false"
              checked={notifications === false}
              onChange={handleNotificationsChange}
            />
            No
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
