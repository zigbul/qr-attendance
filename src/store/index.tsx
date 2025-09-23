import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { type IUser, type IClassItem, type IAttendanceRecord } from '../types';

interface StoreState {
  currentUser: IUser | null;
  mockUsers: IUser[];
  mockClasses: IClassItem[];
  attendances: IAttendanceRecord[];
}

interface StoreActions {
  setCurrentUser: (user: IUser | null) => void;
  removeCurrentUser: () => void;
  addAttendance: (attendance: IAttendanceRecord) => void;
}

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  currentUser: null,
  mockUsers: [
    { id: '1', login: 'student', password: 'student', type: 'student' },
    { id: '2', login: 'teacher', password: 'teacher', type: 'teacher' },
  ],
  mockClasses: [
    { id: '1', title: 'JavaScript - Lecture 1', date: '2025-09-21' },
    { id: '2', title: 'GoLang - Lecture 2', date: '2025-09-22' },
  ],
  attendances: [],
};

const useStore = create<Store>()(
  devtools((set) => ({
    ...initialState,
    setCurrentUser: (user) => set(() => ({ currentUser: user })),
    removeCurrentUser: () => set(() => ({ currentUser: null })),
    addAttendance: (attendance) =>
      set((state) => ({ attendances: [...state.attendances, attendance] })),
  })),
);

export default useStore;
