"use client";
import React, { useRef, useState, useEffect } from "react";

function UploadPage({ formData, setFormData }) {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (formData?.images?.length) {
      setImages(
        formData.images.map((img) => ({
          preview: img,
        }))
      );
    } else {
      setImages([]);
    }
  }, [formData.images]);

  const handleFileChange = (e) => {
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

    validFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;

        setImages((prev) => [
          ...prev,
          {
            preview: base64,
          },
        ]);

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, base64],
        }));
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeAll = () => {
    setImages([]);

    setFormData((prev) => ({
      ...prev,
      images: [],
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
            <h3 className="text-lg font-semibold text-gray-900">
              Upload Images
            </h3>

            <p className="text-sm text-gray-500">
              Maximum 6 images (PNG, JPG, JPEG)
            </p>
          </div>

          {images.length > 0 && images.length < 6 && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Add More
            </button>
          )}
        </div>

        {/* Upload Box */}
        {images.length === 0 ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 text-center transition hover:border-blue-500 hover:bg-blue-50 sm:py-16"
          >
            <div className="mb-3 text-5xl">📷</div>

            <p className="text-base font-semibold text-gray-800">
              Click to Upload Images
            </p>

            <p className="mt-2 text-sm text-gray-500">
              PNG, JPG or JPEG (Max 2MB)
            </p>
          </div>
        ) : (
          <>
            {/* Images */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                >
                  <img
                    src={img.preview}
                    alt=""
                    className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white opacity-90 transition hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}

              {images.length < 6 && (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-4xl font-light text-gray-400 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                >
                  +
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{images.length}</span> / 6 images uploaded
              </p>

              <button
                type="button"
                onClick={removeAll}
                className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
              >
                Remove All
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadPage;