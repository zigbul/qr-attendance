import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { IUser, IAttendanceRecord } from '../types';

interface StoreState {
  currentUser: IUser | null;
  attendances: IAttendanceRecord[];
  fullname?: string;
}

interface StoreActions {
  setCurrentUser: (user: IUser | null) => void;
  removeCurrentUser: () => void;
  addAttendance: (attendance: IAttendanceRecord) => void;
  setFullName: (fullName: string) => void;
}

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  currentUser: null,
  attendances: [],
};

const useStore = create<Store>()(
  devtools((set) => ({
    ...initialState,
    setCurrentUser: (user) => set(() => ({ currentUser: user })),
    removeCurrentUser: () => set(() => ({ currentUser: null })),
    addAttendance: (attendance) =>
      set((state) => ({ attendances: [...state.attendances, attendance] })),
    setFullName: (fullname) => set(() => ({ fullname })),
  })),
);

export default useStore;
