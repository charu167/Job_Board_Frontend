"use client"

import { useState } from "react";
import axios from "axios";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary_min: "",
    salary_max: "",
    created_at: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/jobs", {
        ...formData,
        salary_min: parseInt(formData.salary_min),
        salary_max: parseInt(formData.salary_max),
      });
      setMessage("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        skills: "",
        location: "",
        salary_min: "",
        salary_max: "",
        created_at: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      setMessage("Failed to post the job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-800 text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Post a Job</h1>
        <p className="text-lg mb-6">
          Fill in the details below to add a new job listing to the database.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="p-3 rounded-lg text-gray-900"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            className="p-3 rounded-lg text-gray-900"
            value={formData.description}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Required Skills (e.g., React, Node.js)"
            className="p-3 rounded-lg text-gray-900"
            value={formData.skills}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Job Location (e.g., New York)"
            className="p-3 rounded-lg text-gray-900"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <div className="flex gap-4">
            <input
              type="number"
              name="salary_min"
              placeholder="Min Salary"
              className="p-3 rounded-lg text-gray-900 flex-1"
              value={formData.salary_min}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="salary_max"
              placeholder="Max Salary"
              className="p-3 rounded-lg text-gray-900 flex-1"
              value={formData.salary_max}
              onChange={handleInputChange}
              required
            />
          </div>

          <input
            type="date"
            name="created_at"
            className="p-3 rounded-lg text-gray-900"
            value={formData.created_at}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("successfully") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
