import React from 'react'

const Interests = ({ formData, setFormData }) => {

    const { interests } = formData;

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            interests: {
                ...prevData.interests,
                [name]: checked
            }
        }));    
    }
  return (
    <div className='interests-form-container'>
      {/* Interests form fields would go here */}
      <div className='interests-form-fields'>
            <label className='label'>   Interests:</label>
            <div className='checkbox-group'>
                <label>
                    <input type="checkbox" name="coding" checked={interests.coding} onChange={handleCheckboxChange} /> Coding
                </label>
                <label>
                    <input type="checkbox" name="music" checked={interests.music} onChange={handleCheckboxChange} /> Music                
                </label>
                <label>
                    <input type="checkbox" name="sports" checked={interests.sports} onChange={handleCheckboxChange} /> Sports
                </label>
                <label>
                    <input type="checkbox" name="travel" checked={interests.travel} onChange={handleCheckboxChange} /> Travel
                </label>
                <label>
                    <input type="checkbox" name="reading" checked={interests.reading} onChange={handleCheckboxChange} /> Reading
                </label>
                <label>
                    <input type="checkbox" name="gaming" checked={interests.gaming} onChange={handleCheckboxChange} /> Gaming
                </label>
            </div>
      </div>
    </div>
  )
}

export default Interests