import axios from 'axios';

export const getSupportedBrowsers = async () => {
  const response = await axios.get('/api/browsers');
  return response.data;
};
