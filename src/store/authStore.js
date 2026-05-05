import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user:         null,
      accessToken:  null,
      refreshToken: null,
      isLoading:    false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await authAPI.login({ email, password });
          const { user, accessToken, refreshToken } = data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user, accessToken, refreshToken, isAuthenticated: true, isLoading: false });
          return { success: true, role: user.role };
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      register: async (formData) => {
        set({ isLoading: true });
        try {
          const { data } = await authAPI.register(formData);
          const { user, accessToken, refreshToken } = data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user, accessToken, refreshToken, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        try {
          const { refreshToken } = get();
          await authAPI.logout(refreshToken);
        } catch {}
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      fetchMe: async () => {
        try {
          const { data } = await authAPI.getMe();
          set({ user: data.data });
        } catch { get().logout(); }
      },

      updateUser: (updates) => set((s) => ({ user: { ...s.user, ...updates } })),

      isAdmin: () => ['super_admin', 'admin', 'manager'].includes(get().user?.role),
      isSuperAdmin: () => get().user?.role === 'super_admin',
    }),
    {
      name: 'omdeve-auth',
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken, refreshToken: s.refreshToken, isAuthenticated: s.isAuthenticated }),
    }
  )
);

export default useAuthStore;



































// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { authAPI } from '../services/api';

// const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       accessToken: null,
//       refreshToken: null,
//       isAuthenticated: false,
//       isLoading: false,

//       login: async (email, password) => {
//         set({ isLoading: true });
//         try {
//           const { data } = await authAPI.login({ email, password });
//           const { user, accessToken, refreshToken } = data.data;
//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('refreshToken', refreshToken);
//           set({ user, accessToken, refreshToken, isAuthenticated: true });
//           return { role: user.role };
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       register: async (formData) => {
//         set({ isLoading: true });
//         try {
//           const { data } = await authAPI.register(formData);
//           const { user, accessToken, refreshToken } = data.data;
//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('refreshToken', refreshToken);
//           set({ user, accessToken, refreshToken, isAuthenticated: true });
//           return { role: user.role };
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       logout: async () => {
//         try { await authAPI.logout(get().refreshToken); } catch {}
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
//       },

//       fetchMe: async () => {
//         try {
//           const { data } = await authAPI.getMe();
//           set({ user: data.data });
//         } catch { get().logout(); }
//       },

//       updateUser: (u) => set(s => ({ user: { ...s.user, ...u } })),

//       isAdmin: () => ['super_admin','admin','manager'].includes(get().user?.role),
//       isSuperAdmin: () => get().user?.role === 'super_admin',
//     }),
//     {
//       name: 'omdeve-auth',
//       partialize: s => ({
//         user: s.user,
//         accessToken: s.accessToken,
//         refreshToken: s.refreshToken,
//         isAuthenticated: s.isAuthenticated,
//       }),
//     }
//   )
// );

// export default useAuthStore;