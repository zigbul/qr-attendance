import axios from 'axios';

import type {
  IActivateLessonDto,
  ICreateLessonDto,
  ILoginDto,
  IMarkAttendanceDto,
  IRegisterDto,
  IUserResponse,
} from './types';

const api = axios.create({
  baseURL: 'https://localhost:7250/api',
  withCredentials: true,
});

export const AccountApi = {
  login: (data: ILoginDto): Promise<IUserResponse> =>
    api.post('/account/login', data).then((res) => res.data),

  logout: (): Promise<void> => api.post('/account/logout').then((res) => res.data),

  register: (data: IRegisterDto): Promise<void> =>
    api.post('/account/register', data).then((res) => res.data),
};

export const LessonApi = {
  create: (data: ICreateLessonDto) => api.post('/lesson/create', data).then((res) => res.data),

  activate: (lessonId: number, data: IActivateLessonDto) =>
    api.post(`/lesson/${lessonId}/activate`, data).then((res) => res.data),

  getQr: (lessonId: number) => api.get(`/lesson/${lessonId}/qrcode`).then((res) => res.data),

  getAttendance: (lessonId: number) =>
    api.get(`/lesson/${lessonId}/attendance`).then((res) => res.data),

  downloadAttendanceExcel: async (lessonId: number) => {
    const res = await api.get(`/lesson/${lessonId}/attendance/excel`, { responseType: 'blob' });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_lesson_${lessonId}.xlsx`;
    link.click();
  },
};

export const AttendanceApi = {
  mark: (lessonId: number, data: IMarkAttendanceDto) =>
    api.post(`lesson/${lessonId}/attendance`, data).then((res) => res.data),
};
