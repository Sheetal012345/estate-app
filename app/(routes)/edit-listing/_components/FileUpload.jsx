"use client";
import React, { useEffect, useState } from "react";

function FileUpload({ setImages }) {
  const [imagePreview, setImagePreview] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    setImages(files); // send files to parent

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreview(previews);
  };

  // cleanup object URLs (IMPORTANT)
  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
        >
          <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
              />
            </svg>

            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>

            <p className="text-xs">
              PNG, JPG, GIF (MAX. 800x400px)
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept="image/png,image/gif,image/jpeg"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-3 mt-3">
        {imagePreview.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt="preview"
              className="rounded-lg object-cover h-[100px] w-[100px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
