import { create } from 'zustand'
import axios from 'axios';
import Cookie from 'js-cookie';

const useUser = create((set) => ({
    currentUser: null, // Rename to avoid confusion with the list
    allTuitions: [],
    
    // For the logged in user
    setCurrentUser: (userData) => set({ currentUser: userData }),
    
    // For fetching the user profile
    fetchUser: async () => {
        const token = Cookie.get("token");
        if (!token) return;
        try {
            const response = await axios.get("http://localhost:3000/user/user", {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Your backend returns { user: getUser }, so access .user
            set({ currentUser: response.data.user });
        } catch (error) {
            console.error("User fetch error:", error);
        }
    }
}));
export default useUser