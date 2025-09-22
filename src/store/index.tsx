import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { type User } from '../types';

interface StoreState {
  currentUser: User | null;
  database: User[];
}

interface StoreActions {
  setCurrentUser: (user: User) => void;
  removeCurrentUser: () => void;
}

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  currentUser: null,
  database: [
    { login: 'student', password: 'student', type: 'student' },
    { login: 'teacher', password: 'teacher', type: 'teacher' },
  ],
};

const useStore = create<Store>()(
  devtools((set) => ({
    ...initialState,
    setCurrentUser: (user) => set(() => ({ currentUser: user })),
    removeCurrentUser: () => set(() => ({ currentUser: null })),
  })),
);

export default useStore;
