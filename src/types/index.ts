export type Student = 'Student';

export type Teacher = 'Teacher';

export interface IUser {
  id: string;
  fullName: string;
  role: Student | Teacher;
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
