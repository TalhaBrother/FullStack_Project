import { create } from 'zustand'
import axios from 'axios';
import Cookie from 'js-cookie';

const useAuth = create((set) => ({
    user: null,
    updateUser: (newUser) => set({ user: newUser }),
    fetchUser: async () => {
        try {
            const token = Cookie.get("token");
            console.log("AuthToken:", token);
            if (token) {
                const response = await axios.get("http://localhost:3000/user/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("AuthUserResponse:", response);
                set({ user: response.data });
            }
        } catch (error) {
            console.error("Auth fetch error:", error);
        }
    }
}))

export default useAuth