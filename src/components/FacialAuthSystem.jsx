// FacialAuthSystem.jsx
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const FacialAuthSystem = () => {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState('Please stand in front of the camera.');

  // Dummy function to simulate authentication, replace with real authentication logic
  const authenticate = async () => {
    setStatus('Scanning...');
    // Simulate a delay as if connecting to a backend service
    setTimeout(() => {
      setStatus('Authenticated');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          height={480}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user"
          }}
          className="w-full"
          onUserMedia={authenticate} // Trigger authentication when the camera is ready
        />
        <div className="p-4 text-center">
          <h1 className="text-2xl font-semibold mb-2">Gate Entry Authentication</h1>
          <p className="text-lg">{status}</p>
          <div
            className={`mt-4 p-2 text-white font-bold rounded-full transition-all ${
              status === 'Authenticated' ? 'bg-green-500' : 'bg-blue-500'
            }`}
          >
            {status === 'Authenticated' ? (
              <>
                <span className="block w-5 h-5 mx-auto mb-1">
                  {/* Checkmark icon, use an actual SVG or icon font here */}
                  ✔️
                </span>
                Welcome!
              </>
            ) : (
              'Please wait...'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialAuthSystem;
