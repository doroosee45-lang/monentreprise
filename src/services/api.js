// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || '/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// });

// // Request interceptor — attach access token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Response interceptor — refresh token on 401
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => error ? prom.reject(error) : prom.resolve(token));
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
//           .then((token) => { originalRequest.headers.Authorization = `Bearer ${token}`; return api(originalRequest); })
//           .catch((err) => Promise.reject(err));
//       }
//       originalRequest._retry = true;
//       isRefreshing = true;
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) throw new Error('No refresh token');
//         const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
//         const { accessToken, refreshToken: newRefresh } = data.data;
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('refreshToken', newRefresh);
//         api.defaults.headers.Authorization = `Bearer ${accessToken}`;
//         processQueue(null, accessToken);
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth
// export const authAPI = {
//   register: (data)          => api.post('/auth/register', data),
//   login: (data)             => api.post('/auth/login', data),
//   logout: (refreshToken)    => api.post('/auth/logout', { refreshToken }),
//   getMe: ()                 => api.get('/auth/me'),
//   forgotPassword: (email)   => api.post('/auth/forgot-password', { email }),
//   resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
//   updateProfile: (data)     => api.put('/auth/update-profile', data),
//   changePassword: (data)    => api.put('/auth/change-password', data),
// };

// // Devis
// export const devisAPI = {
//   create: (formData)     => api.post('/devis', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
//   getAll: (params)       => api.get('/devis', { params }),
//   getMy: ()              => api.get('/devis/my'),
//   getById: (id)          => api.get(`/devis/${id}`),
//   update: (id, data)     => api.put(`/devis/${id}`, data),
//   delete: (id)           => api.delete(`/devis/${id}`),
// };

// // Projects
// export const projectsAPI = {
//   create: (data)           => api.post('/projects', data),
//   getAll: (params)         => api.get('/projects', { params }),
//   getMy: ()                => api.get('/projects/my'),
//   getPortfolio: (params)   => api.get('/projects/portfolio', { params }),
//   getById: (id)            => api.get(`/projects/${id}`),
//   update: (id, data)       => api.put(`/projects/${id}`, data),
//   delete: (id)             => api.delete(`/projects/${id}`),
//   addTask: (id, data)      => api.post(`/projects/${id}/tasks`, data),
//   updateTask: (id, tid, data) => api.put(`/projects/${id}/tasks/${tid}`, data),
// };

// // Blog
// export const blogAPI = {
//   create: (data)     => api.post('/blogs', data),
//   getAll: (params)   => api.get('/blogs', { params }),
//   getBySlug: (slug)  => api.get(`/blogs/${slug}`),
//   update: (id, data) => api.put(`/blogs/${id}`, data),
//   delete: (id)       => api.delete(`/blogs/${id}`),
// };

// // Tickets
// export const ticketsAPI = {
//   create: (data)        => api.post('/tickets', data),
//   getMy: ()             => api.get('/tickets/my'),
//   getAll: (params)      => api.get('/tickets', { params }),
//   getById: (id)         => api.get(`/tickets/${id}`),
//   addMessage: (id, data) => api.post(`/tickets/${id}/messages`, data),
//   update: (id, data)    => api.put(`/tickets/${id}`, data),
// };

// // Prospects
// export const prospectsAPI = {
//   create: (data)              => api.post('/prospects', data),
//   getAll: (params)            => api.get('/prospects', { params }),
//   getById: (id)               => api.get(`/prospects/${id}`),
//   update: (id, data)          => api.put(`/prospects/${id}`, data),
//   addInteraction: (id, data)  => api.post(`/prospects/${id}/interactions`, data),
//   convert: (id)               => api.post(`/prospects/${id}/convert`),
//   delete: (id)                => api.delete(`/prospects/${id}`),
// };

// // Audit
// export const auditAPI = {
//   submit: (data)   => api.post('/audits', data),
//   getAll: ()       => api.get('/audits'),
//   getById: (id)    => api.get(`/audits/${id}`),
// };

// // Users
// export const usersAPI = {
//   getAll: (params)    => api.get('/users', { params }),
//   getById: (id)       => api.get(`/users/${id}`),
//   update: (id, data)  => api.put(`/users/${id}`, data),
//   delete: (id)        => api.delete(`/users/${id}`),
//   getDashboard: ()    => api.get('/users/dashboard'),
// };

// export default api;





import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor — attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — refresh token on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => error ? prom.reject(error) : prom.resolve(token));
  failedQueue = [];
};

// Routes that must NEVER trigger a token refresh (they return 401 on bad credentials)
const AUTH_ROUTES = ['/auth/login', '/auth/register', '/auth/refresh'];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Do NOT attempt refresh if the failing request is an auth route itself
    const isAuthRoute = AUTH_ROUTES.some((route) => originalRequest.url?.includes(route));

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then((token) => { originalRequest.headers.Authorization = `Bearer ${token}`; return api(originalRequest); })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefresh } = data.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefresh);
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register:        (data)          => api.post('/auth/register', data),
  login:           (data)          => api.post('/auth/login', data),
  logout:          (refreshToken)  => api.post('/auth/logout', { refreshToken }),
  getMe:           ()              => api.get('/auth/me'),
  forgotPassword:  (email)         => api.post('/auth/forgot-password', { email }),
  resetPassword:   (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  updateProfile:   (data)          => api.put('/auth/update-profile', data),
  changePassword:  (data)          => api.put('/auth/change-password', data),
};

// Devis
export const devisAPI = {
  create:   (formData) => api.post('/devis', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll:   (params)   => api.get('/devis', { params }),
  getMy:    ()         => api.get('/devis/my'),
  getById:  (id)       => api.get(`/devis/${id}`),
  update:   (id, data) => api.put(`/devis/${id}`, data),
  delete:   (id)       => api.delete(`/devis/${id}`),
};

// Projects
export const projectsAPI = {
  create:     (data)              => api.post('/projects', data),
  getAll:     (params)            => api.get('/projects', { params }),
  getMy:      ()                  => api.get('/projects/my'),
  getPortfolio: (params)          => api.get('/projects/portfolio', { params }),
  getById:    (id)                => api.get(`/projects/${id}`),
  update:     (id, data)          => api.put(`/projects/${id}`, data),
  delete:     (id)                => api.delete(`/projects/${id}`),
  addTask:    (id, data)          => api.post(`/projects/${id}/tasks`, data),
  updateTask: (id, tid, data)     => api.put(`/projects/${id}/tasks/${tid}`, data),
};

// Blog
export const blogAPI = {
  create:    (data)     => api.post('/blogs', data),
  getAll:    (params)   => api.get('/blogs', { params }),
  getBySlug: (slug)     => api.get(`/blogs/${slug}`),
  update:    (id, data) => api.put(`/blogs/${id}`, data),
  delete:    (id)       => api.delete(`/blogs/${id}`),
};

// Tickets
export const ticketsAPI = {
  create:     (data)         => api.post('/tickets', data),
  getMy:      ()             => api.get('/tickets/my'),
  getAll:     (params)       => api.get('/tickets', { params }),
  getById:    (id)           => api.get(`/tickets/${id}`),
  addMessage: (id, data)     => api.post(`/tickets/${id}/messages`, data),
  update:     (id, data)     => api.put(`/tickets/${id}`, data),
};

// Prospects
export const prospectsAPI = {
  create:         (data)         => api.post('/prospects', data),
  getAll:         (params)       => api.get('/prospects', { params }),
  getById:        (id)           => api.get(`/prospects/${id}`),
  update:         (id, data)     => api.put(`/prospects/${id}`, data),
  addInteraction: (id, data)     => api.post(`/prospects/${id}/interactions`, data),
  convert:        (id)           => api.post(`/prospects/${id}/convert`),
  delete:         (id)           => api.delete(`/prospects/${id}`),
};

// Audit
export const auditAPI = {
  submit:   (data) => api.post('/audits', data),
  getAll:   ()     => api.get('/audits'),
  getById:  (id)   => api.get(`/audits/${id}`),
};

// Users
export const usersAPI = {
  getAll:       (params)    => api.get('/users', { params }),
  getById:      (id)        => api.get(`/users/${id}`),
  update:       (id, data)  => api.put(`/users/${id}`, data),
  delete:       (id)        => api.delete(`/users/${id}`),
  getDashboard: ()          => api.get('/users/dashboard'),
};

export default api;