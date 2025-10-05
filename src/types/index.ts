export type Student = 'Student';

export type Teacher = 'Teacher';

export interface IUser {
  fullName: string;
  role: Student | Teacher;
}

export interface ITeacherInfo extends IUser {
  lessons: ILessonInfo[];
}

export interface IStudentInfo extends IUser {
  groupId: string;
}

export interface ILessonInfo {
  id: string;
  date: string;
  is_active: boolean;
  name_lesson: string;
  qr_token: string;
  type_les: string;
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
