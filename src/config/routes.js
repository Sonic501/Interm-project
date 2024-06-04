const routes = {
  login: "/login",
  forgotpassword: "/forgotpassword",
  verificationOTP: "/verificationOTP",
  changePasswod: "/change_passwod",

  home: "/",

  // syllabus: "/syllabus",
  viewSyllabus: "/syllabus/view_syllabus",
  viewSyllabusDetail: "/syllabus/view_syllabus/:id",
  createSyllabus: "/syllabus/create_syllabus",

  // trainingProgram: "/training_program",
  viewListProgram: "/program/view_list_program",
  viewProgram: "/program/view_program/:programID",
  viewProgramDetail: "/program/view_program_detail/:programID/:syllabusID",
  createProgram: "/program/create_program",
  createProgramName: "/program/create_program_name",

  //programSyllabus
  viewListProgramSyllabusDraft: "/program/view_list_program_syllabus_draft",

  // class: "/class",
  viewClass: "/class/view_class",
  viewClassDetail: "/class/view_class/:id",
  createClass: "/class/create_class",
  createClasssearchProgram: "/class/create_class/searchPro",
  createClassformClass: "/class/create_class/searchPro/formClass",
  createClassformSave: "/class/create_class/searchPro/formSave",
  createClassContent: "/class/create_class/searchPro/content",
  createClassSyllabus: "/class/create_class/searchPro/syllabus",

  trainingCalendar: "/training_calendar",

  // user: "/user",
  userList: "/user/user_list",
  userPermission: "/user/user_permission",
  userInformation: "/user/user_information",

  learningMaterials: "/learning_materials",

  // setting: "/setting",
  calendarDay: "/setting/calendar_day",
  calendarWeek: "/setting/calendar_week",
};

export default routes;
