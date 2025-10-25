import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://springapp-iagv.onrender.com",
});

// ✅ Automatically attach JWT token to each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
