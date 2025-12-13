import axios from 'axios';

const api = axios.create({
   // Use 127.0.0.1 to avoid IPv6/localhost resolution issues in some environments
   baseURL: "http://127.0.0.1:5000/api"
});

export const getServices = () => api.get('/services');
export const getProjects = () => api.get('/projects');
export const getTeamMembers = () => api.get('/team');
export const getJobs = () => api.get('/jobs');

export const sendContact = (payload) => api.post('/contact', payload);

export default api;
