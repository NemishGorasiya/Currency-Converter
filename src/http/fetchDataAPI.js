export const fetchData = async ({ url, headers, method = "GET" }) => {
  const options = {
    method: method,
    headers: headers,
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    if (data.success) {
      return data.result;
    }
  } catch (error) {
    console.error(error);
  }
};
