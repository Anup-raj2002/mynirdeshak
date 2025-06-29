import axios from "axios";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: `/api/${
    import.meta.env.VITE_API_VERSION
  }`,
  withCredentials: true,
});

let isFirebaseAuthChecked = false;
let authCheckedPromise = new Promise(resolve => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    isFirebaseAuthChecked = true;
    unsubscribe();
    resolve(user);
  });
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = config.headers || {};
    if (!isFirebaseAuthChecked) {
      await authCheckedPromise;
    }

    const user = auth.currentUser;

    try {
      if (user) {
        const token = await user.getIdToken(true);
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        delete config.headers['Authorization'];
      }
    } catch (error) {
      throw error;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const user = auth.currentUser;
      if (user) {
        try {
          const newToken = await user.getIdToken(true);
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          await signOut(auth);
        }
      } else {
        
        await signOut(auth);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
