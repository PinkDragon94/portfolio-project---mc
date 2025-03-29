import axios from "axios";
import { jwtDecode } from 'jwt-decode';
// Replace with your API base URL
const API_BASE_URL = "http://localhost:5000/api"; // Update as needed

// Initialize Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authentication token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to handle errors globally
const handleApiError = (error) => {
  console.error("API Error:", error.response ? error.response.data : error.message);
  return { error: error.response ? error.response.data : "An error occurred" };
};

/**
 * Admin API
 */
export const getPendingJobs = async () => {
  try {
    const response = await api.get("/admin/pending-jobs");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPendingEvents = async () => {
  try {
    const response = await api.get("/admin/pending-events");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const approveOrDeny = async (id, type, status) => {
  try {
    const response = await api.put("/admin/approve", { id, type, status });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Partner API
 */
// if (!user?.role || user.role !== "vendor") return "Unauthorized";

export const submitJob = async (jobData) => {
  try {
    const response = await api.post("/vendor/job", jobData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const submitEvent = async (eventData) => {
  try {
    const response = await api.post("/vendor/event", eventData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
const handleSubmit = async (type) => {
  const payload = { title: type === "job" ? jobTitle : eventTitle, createdBy: user.email };

  try {
    const response = await submitJob(payload); // Use imported function
    console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} Submitted`, response);
    if (type === "job") setJobTitle("");
    if (type === "event") setEventTitle("");
  } catch (error) {
    console.error("Error submitting", type, error);
  }
};

/**
 * Alumni API
 */
export const getJobs = async () => {
  try {
    const response = await api.get("/alumni/jobs");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Re-add the getEvents function here for Alumni
export const getEvents = async () => {
  try {
    const response = await api.get("/alumni/events");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const applyForJob = async (jobId) => {
  try {
    const response = await api.post(`/alumni/apply/${jobId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Approve Event function (using axios instead of fetch)
 */
export const approveEvent = async (eventId) => {
  try {
    const response = await api.put(`/api/events/approve/${eventId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// src/api/alumniData.js
export async function fetchAlumniData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        profilePic: "/images/default-avatar.png",
        bio: "Software Engineer and proud alumni member."
      });
    }, 1000);
  });
}
