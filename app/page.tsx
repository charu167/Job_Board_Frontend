"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchNonAppliedJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:3000/jobs/not-applied"
      );
      // @ts-ignore
      setJobs(response.data.jobs);
    } catch (err) {
      console.error("Error fetching non-applied jobs:", err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (keyword: string) => {
    if (!keyword.trim()) {
      fetchNonAppliedJobs();
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3000/jobs/search", {
        params: { keyword },
      });
      // @ts-ignore
      setJobs(response.data.jobs);
    } catch (err) {
      console.error("Error searching jobs:", err);
      setError("Failed to search jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNonAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight sm:text-5xl">
            Discover Your Next Opportunity
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse jobs you haven’t applied to yet and find your perfect match.
            Use the search bar to narrow down the opportunities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-3xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search jobs by keywords..."
            className="block w-full px-5 py-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchJobs(e.target.value);
            }}
          />
          <svg
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.707 20.293l-5.386-5.386A8.471 8.471 0 0018 10.5C18 5.805 14.195 2 9.5 2S1 5.805 1 10.5 5.805 19 10.5 19a8.471 8.471 0 004.407-1.179l5.386 5.386a1 1 0 001.414-1.414zM10.5 17C6.364 17 3 13.636 3 10.5S6.364 4 10.5 4 18 7.364 18 10.5 14.636 17 10.5 17z" />
          </svg>
        </div>

        {/* Job List */}
        {loading ? (
          <p className="text-center text-xl font-medium text-gray-700">
            Loading jobs...
          </p>
        ) : error ? (
          <p className="text-center text-xl font-medium text-red-600">
            {error}
          </p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No jobs found. Try a different search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job: any, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {job.description}
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Skills:</strong> {job.skills}
                  </p>
                  <p>
                    <strong>Source:</strong> {job.source}
                  </p>
                  <p>
                    <strong>Salary:</strong> ${job.salary_min} - $
                    {job.salary_max}
                  </p>
                  <p>
                    <strong>Date Posted:</strong>{" "}
                    {new Date(job.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </div>
                <a
                  href={job.link_to_apply}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
