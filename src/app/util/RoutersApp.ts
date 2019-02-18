
export class RoutersApp {

  static readonly home = '';
  static readonly student = 'student';
  static readonly schedule = 'schedule';
  static readonly medicalHistory = 'medicalHistory';
  static readonly profile = 'profile';

  static readonly progress = 'progress';
  static readonly completeStudentSchedule = RoutersApp.student + '/' + RoutersApp.student;
  static readonly profiles = RoutersApp.profile + '/' + RoutersApp.profile;
  // static readonly completeStudentProgress = RoutersApp.progress + '/' + RoutersApp.progress;

  static readonly studentDetail = 'student/:id';


  constructor() { }
}
