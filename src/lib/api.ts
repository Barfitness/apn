import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const initializeCall = async (phoneNumber: string) => {
  const response = await api.post('/call/initialize', { phoneNumber });
  return response.data;
};

export const generateAIResponse = async (input: string) => {
  const response = await api.post('/ai/generate', { input });
  return response.data;
};

export const getTwilioToken = async () => {
  const response = await api.get('/twilio/token');
  return response.data.token;
};
