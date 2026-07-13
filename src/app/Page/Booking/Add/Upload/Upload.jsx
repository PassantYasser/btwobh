"use client";
import React, { useRef, useState, useEffect } from "react";

function UploadPage({formData , setFormData}) {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  // Initialize previews if formData has existing images
  useEffect(() => {
    if (formData?.images && Array.isArray(formData.images)) {
      const formImages = formData.images.map((img) => ({
        file: null,
        preview: img,
      }));
      setImages((prev) => {
        const prevPreviews = prev.map((p) => p.preview);
        const newPreviews = formImages.map((f) => f.preview);
        if (JSON.stringify(prevPreviews) === JSON.stringify(newPreviews)) {
          return prev;
        }
        return formImages;
      });
    }
  }, [formData?.images]);

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    if (images.length + files.length > 6) {
      alert("You can upload up to 6 images only.");
      return;
    }

    const MAX_SIZE = 2 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        alert(`${file.name} is not a valid image.`);
        return false;
      }

      if (file.size > MAX_SIZE) {
        alert(`${file.name} exceeds 2MB.`);
        return false;
      }

      return true;
    });

    const uploadedImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...uploadedImages]);

    // Convert new files to base64 using async/await
    try {
      const base64Strings = [];
      for (const file of validFiles) {
        const base64 = await readFileAsBase64(file);
        base64Strings.push(base64);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...base64Strings],
      }));
    } catch (err) {
      console.error("Error reading file:", err);
    }

    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mt-6 space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        Product Images
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Upload Images
            </h3>

            <p className="text-sm text-gray-500">
              Maximum 6 images • PNG, JPG, JPEG • Max 2MB
            </p>
          </div>

          {images.length > 0 && images.length < 6 && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              Add More
            </button>
          )}
        </div>

        {/* Upload Box */}
        {images.length === 0 ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 transition hover:border-blue-500 hover:bg-blue-50 sm:py-16"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-4xl text-blue-600">
              +
            </div>

            <p className="mt-5 text-center font-semibold text-gray-700">
              Click to upload images
            </p>

            <p className="mt-2 text-center text-sm text-gray-400">
              Drag & Drop or Click Here
            </p>
          </div>
        ) : (
          <>
            {/* Images */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                >
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}

              {images.length < 6 && (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <span className="text-5xl font-light text-gray-400">
                    +
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {images.length} / 6 images uploaded
              </p>

              {images.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setImages([]);
                    setFormData((prev) => ({
                      ...prev,
                      images: [],
                    }));
                  }}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove All
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
