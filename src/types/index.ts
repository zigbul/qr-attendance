export type Student = 'Student';

export type Teacher = 'Teacher';

export interface IUser {
  id: string;
  login: string;
  password: string;
  type: Student | Teacher;
}

export interface IClassItem {
  id: string;
  title: string;
  date: string;
}

export interface IAttendanceRecord {
  classId: string;
  studentId: string;
  timestamp: string;
}

export interface ReportRow {
  Class: string;
  Date: string;
  Student: string;
  Timestamp: string;
}

export interface ILoginDto {
  login: string;
  password: string;
}

export interface IRegisterDto {
  login: string;
  fullName: string;
  password: string;
  role: Student | Teacher;
  groupId: number | null;
}

export interface ICreateLessonDto {
  title: string;
  date: string;
  groupId: number[];
}

export interface IActivateLessonDto {
  expireMinutes: number;
}

export interface IMarkAttendanceDto {
  qrToken: string;
}

export interface IUserResponse {
  id: string;
  login: string;
  role: Student | Teacher;
}
