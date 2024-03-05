import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import PhotoGallery from './PhotoGallery'; // Make sure you import PhotoGallery component
import axios from 'axios'; // Assuming axios is used for HTTP requests

const EmployeeRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: ''
    // Add more fields if necessary
  });
  const [images, setImages] = useState([]);
  const webcamRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages([...images, imageSrc]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare form data for submission
    const submitData = new FormData();
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }
    images.forEach((image, index) => {
      submitData.append(`image_${index}`, image);
    });

    // TODO: Submit to backend
    // const response = await axios.post('/api/submit-endpoint', submitData);
    // ...

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <h2 className="text-center text-xl font-bold mb-6">Employee Registration</h2>
  <form onSubmit={handleSubmit} className="mb-4">
    {/* Form fields */}
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
      Name
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="name"
      type="text"
      placeholder="John Doe"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      required
    />
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
      Employee ID
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="employeeId"
      type="text"
      placeholder="123456"
      name="employeeId"
      value={formData.employeeId}
      onChange={handleInputChange}
      required
    />
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
      Department
    </label>
    <select
      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="department"
      name="department"
      value={formData.department}
      onChange={handleInputChange}
      required
    >
      <option value="">Select a department</option>
      <option value="HR">HR</option>
      <option value="Engineering">Engineering</option>
      <option value="Sales">Sales</option>
      {/* Add more department options as needed */}
    </select>
    
    {/* Webcam capture */}
    <div className="my-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-md"
      />
      <button
        type="button" // This button doesn't submit the form
        onClick={handleCapture}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Capture Image
      </button>
    </div>

    {/* Images gallery */}
    <PhotoGallery images={images} />
    
    {/* Submit button */}
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
      </button>
    </div>
  </form>
</div>
);
}

export default EmployeeRegistration;

