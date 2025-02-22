const handleFileUpload = async ({
  formData,
  action,
  headers,
  method,
  token,
}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${action}`, {
    method: method,
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
  return response;
};

export default handleFileUpload;
