export interface IStudent {
  id: number;
  courseId?: number;
  firstName: string;
  lastName: string;
  city: string;
}

export interface IStudentList {
  id: number;
  name: string;
  city: string;
  course: string;
}

export interface ICourse {
  id: number;
  name: string;
}

export interface ICourseList {
  id: number;
  name: string;
  isDeletable: boolean
}
