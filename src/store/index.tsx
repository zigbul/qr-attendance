import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { IAttendanceRecord, IClassItem, IUserResponse } from '../types';
import { LessonApi } from '../api';

interface StoreState {
  currentUser: IUserResponse | null;
  classes: IClassItem[];
  attendances: IAttendanceRecord[];
}

interface StoreActions {
  setCurrentUser: (user: IUserResponse | null) => void;
  removeCurrentUser: () => void;
  addAttendance: (attendance: IAttendanceRecord) => void;
  fetchLessons: () => Promise<void>;
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

    fetchLessons: async () => {
      try {
        const data = await LessonApi.getLessons();
        set(() => ({ classes: data }));
        console.log('Fetched lessons:', data);
      } catch (error) {
        console.log('Failed to fetch lessons:', error);
      }
    },
  })),
);

export default useStore;
