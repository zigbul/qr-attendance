export interface IUser {
  id: string;
  login: string;
  password: string;
  type: 'student' | 'teacher';
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
