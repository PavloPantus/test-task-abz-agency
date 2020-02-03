const baseUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const usersUrl = `${baseUrl}/users`;

export const tokenUrl = `${baseUrl}/token`;

export const positionsUrl = `${baseUrl}/positions`;

export const getDataFromApi = async(url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
