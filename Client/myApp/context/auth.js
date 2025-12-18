import { create } from 'zustand'
import axios from 'axios';
import Cookie from 'js-cookie';

(async () => {
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
        }
    } catch (error) {
        console.error("Auth fetch error:", error);
    }
})();
const useAuth = create((set) => ({
  user: null,
    updateUser: (newUser) => set({ user: newUser }),
}))

export default useAuth