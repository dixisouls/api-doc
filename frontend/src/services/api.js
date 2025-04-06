const normalizeUrl = (url) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

const API_URL = normalizeUrl(
  process.env.REACT_APP_API_URL || "http://localhost:8000"
);

export const generateDocumentation = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - it will be set automatically with boundary
    });

    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.detail ||
          `Error: ${response.status} ${response.statusText}`;
      } catch (e) {
        errorMessage = `Error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
