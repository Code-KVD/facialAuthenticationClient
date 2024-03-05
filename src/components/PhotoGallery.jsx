// PhotoGallery.jsx
import React from 'react';

const PhotoGallery = ({ images, onDelete }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img src={image} alt={`Captured ${index}`} className="w-full h-48 object-cover rounded-md" />
          <button
            onClick={() => onDelete(index)}
            className="absolute top-0 right-0 m-1 bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded-full"
            aria-label="Delete image"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
