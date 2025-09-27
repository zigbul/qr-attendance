import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { IAttendanceRecord, IClassItem, IUserResponse } from '../types';

interface StoreState {
  currentUser: IUserResponse | null;
  classes: IClassItem[];
  attendances: IAttendanceRecord[];
}

interface StoreActions {
  setCurrentUser: (user: IUserResponse | null) => void;
  removeCurrentUser: () => void;
  addAttendance: (attendance: IAttendanceRecord) => void;
}

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  currentUser: null,
  classes: [],
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
