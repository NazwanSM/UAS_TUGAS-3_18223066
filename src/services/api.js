import axios from 'axios';

const PATROL_URL = import.meta.env.VITE_PATROL_API_URL;
const INCIDENT_URL = import.meta.env.VITE_INCIDENT_API_URL;

const patrolApi = axios.create({ baseURL: PATROL_URL });
const incidentApi = axios.create({ baseURL: INCIDENT_URL });

patrolApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const api = {
    // ===== AUTH (Patrol Service) =====
    login: async (username, password) => {
        const res = await patrolApi.post('/auth/login', { username, password });
        if (res.data.token) localStorage.setItem('adminToken', res.data.token);
        return res.data;
    },
    
    // ===== OFFICERS (Patrol Service) =====
    getActiveOfficers: async () => {
        const res = await patrolApi.get('/officers?status=on_duty');
        return res.data.data; 
    },

    getAllOfficers: async () => {
        const res = await patrolApi.get('/officers');
        return res.data.data;
    },

    // ===== INCIDENTS (Incident Service) =====
    getAllIncidents: async () => {
        const res = await incidentApi.get('/incidents');
        return res.data.data;
    },

    assignOfficer: async (incidentId, officerData) => {
        return await incidentApi.put(`/incidents/${incidentId}`, {
            status: 'ASSIGNED',
            officer_id: officerData.id,
            officer_name: officerData.name
        });
    }
};