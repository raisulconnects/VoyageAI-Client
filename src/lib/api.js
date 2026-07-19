const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const fetchApi = async (endpoint, options = {}) => {
  let url = `${API_BASE}${endpoint}`;

  if (options.params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const { params, ...fetchOptions } = options;

  const headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("voyage_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, { ...fetchOptions, headers });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    const message = data?.error || data?.message || "Something went wrong";
    const error = new Error(message);
    error.response = { data };
    throw error;
  }

  return { data };
};

const api = {
  get: (endpoint, options) => fetchApi(endpoint, { ...options, method: "GET" }),
  post: (endpoint, bodyData, options) => fetchApi(endpoint, { ...options, method: "POST", body: JSON.stringify(bodyData) }),
  patch: (endpoint, bodyData, options) => fetchApi(endpoint, { ...options, method: "PATCH", body: JSON.stringify(bodyData) }),
  delete: (endpoint, options) => fetchApi(endpoint, { ...options, method: "DELETE" }),
};

export default api;
