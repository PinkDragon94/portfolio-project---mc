import axios from 'axios';

export const getSupportedDevices = async () => {
  const response = await axios.get('/api/devices');
  return response.data;
};
