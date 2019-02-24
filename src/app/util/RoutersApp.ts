
export class RoutersApp {

  static readonly home = '';
  static readonly student = 'student';
  static readonly trainer = 'trainer';
  static readonly schedule = 'schedule';
  static readonly onlyTrainerSchedule = 'schedule-trainer';
  static readonly medicalHistory = 'medicalHistory';
  static readonly profile = 'profile';

  static readonly progress = 'progress';
  static readonly completeStudentSchedule = RoutersApp.student + '/' + RoutersApp.schedule;
  static readonly completeStudentProfile = RoutersApp.student + '/' + RoutersApp.profile;
  static readonly completeTrainerProfile = RoutersApp.trainer + '/' + RoutersApp.profile;
  static readonly profiles = RoutersApp.profile + '/' + RoutersApp.profile;
  // static readonly completeStudentProgress = RoutersApp.progress + '/' + RoutersApp.progress;

  static readonly studentDetail = 'student/:id';

  constructor() { }
}
