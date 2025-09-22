export interface User {
  login: string;
  password: string;
  type: 'student' | 'teacher';
}

export interface ClassItem {
  id: string;
  title: string;
  date: string;
}
