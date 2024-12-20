import React, { useState } from "react";
import Table from "../components/Table";


const Train: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setFileSize(file.size);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
  
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const fileToUpload = fileInput.files?.[0];
  
    if (fileToUpload) {
      // Check for allowed file extensions
      const allowedExtensions = /(\.pdf)$/i; // Adjust this regex for allowed formats
      if (!allowedExtensions.exec(fileToUpload.name)) {
        alert("Invalid file type. Please upload a JPG or PNG file.");
        return;
      }
  
      formData.append("file", fileToUpload);
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, { 
          method: "POST",
          body: formData,
        });
  
        console.log("File uploaded:", response);
        if (response.ok) {
          alert("File uploaded successfully!");
        } else {
          alert("File upload failed.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An error occurred while uploading the file.");
      }
    } else {
      alert("No file to upload.");
    }
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen p-4 px-12 space-y-8 pt-20 text-black">
        <h1 className="w-full text-4xl p-4 border-b-1 border-b">
          Training Data
        </h1>

        <label className="mt-2 cursor-pointer">
          <span className="block w-fit text-white bg-blue-500 rounded px-4 py-2 mb-1 text-center hover:bg-blue-600 transition duration-200">
            Select New File
          </span>
          <input
            className="hidden" // Hide the default input element
            type="file"
            accept=".dot,.doc,.docx,.pdf"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <div className="mt-4">
            <p className="text-lg">File: {selectedFile}</p>
            <p className="text-lg">Size: {(fileSize / 1024).toFixed(2)} KB</p> {/* Display size in KB */}
          </div>
        )}

        <button 
          onClick={handleUpload} 
          className="mt-4 w-fit text-white bg-green-500 rounded px-4 py-2 hover:bg-green-600 transition duration-200"
        >
          Upload
        </button>

        <Table />
      </div>
    </>
  );
};

export default Train;