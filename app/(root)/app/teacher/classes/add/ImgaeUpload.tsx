'use client';

import { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div>
      <label className="block text-sm font-medium text-white" htmlFor="banner">
        Class Banner <span className="-mb-2">*</span>
      </label>

      <label
        htmlFor="banner"
        className="cursor-pointer mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-md"
      >
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Class Banner"
            className="w-full p-2 object-cover"
          />
        )}
        <div className={image ? 'hidden' : '' + 'space-y-1 text-center m-6'}>
          <svg
            className="mx-auto h-12 w-12 text-white"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <div className="relative bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span className="">Upload a file</span>
              <input
                id="banner"
                name="banner"
                type="file"
                onChange={(e) => {
                  const file = e.target?.files && e.target.files[0];
                  if (file) {
                    setImage(file);
                  }
                }}
                className="sr-only"
              />
            </div>
            <p className="pl-1 text-white">or drag and drop</p>
          </div>
          <p className="text-xs text-white">PNG, JPG, GIF up to 5MB</p>
        </div>
      </label>
    </div>
  );
};
export default ImageUpload;
