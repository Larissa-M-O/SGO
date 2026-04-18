const API_URL = "http://localhost:8080";

export async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = response.status !== 204 ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw {
      response: {
        status: response.status,
        data: data,
      },
    };
  }

  return {
    status: response.status,
    data,
  };
}