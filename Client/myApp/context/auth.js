import {create} from 'zustand';
import axios from 'axios';
import Cookie from 'js-cookie';


const useAuthStore = create((set) => ({
    user: null,
    updatedUser: (newUser) => set({ user: newUser }),
}));