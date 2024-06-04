import config from "../config";
import Home from "../pages/Home/Home";
// import CreateSyllabus from "../pages/CreateSyllabus/General/GeneralCreateSyllabus";
// import CreateSyllabus from "../pages/CreateSyllabus/CreateSyllabus";

import CreateSyllabus from "../pages/CreateSyllabus/CreateSyllabus";

import ViewClass from "../pages/ViewClass/ViewClass";
import UserList from "../pages/UserManagement/UserList/UserList";
import UserPermission from "../pages/UserManagement/UserPermission/UserPermission";
import Login from "../pages/Authenticated/Login/Login";

import ViewSyllabus from "../pages/ViewSyllabusList/ViewSyllabus";
import viewSyllabusDetail from "../pages/ViewSyllabus/viewSyllabusDetail";
import ViewClassDetails from "../pages/ViewClassDetails/ClassDetails";
import CreateClass from "../pages/CreateClass/CreateClass";
import Syllabus from "../pages/CreateClass/SearchProgram/Syllabus";
import Content from "../pages/CreateSyllabus/content";
import FormSave from "../pages/CreateClass/SearchProgram/FormSave";
import FormClass from "../pages/CreateClass/SearchProgram/FormClass";
import SearchProgram from "../pages/CreateClass/SearchProgram/SearchProgram";
import TrainingCalendar from "../pages/TrainingCalendar/TrainingCalendar";
import ViewProgram from "../pages/ViewDetailProgram/ViewProgram";
import ViewProgramDetail from "../pages/ViewDetailProgram/ViewProgramDetail";

import ListTrainingPrograms from "../pages/ViewListProgram/ViewListProgram";
import CreateProgram from "../pages/CreateProgram/CreateProgram";
import CreateProgramName from "../pages/CreateProgram/CreateProgramName";


const homeRoutes = {
  path: config.routes.home,
  component: Home,
};
const viewSyllabusRoutes = {
  path: config.routes.viewSyllabus,
  component: ViewSyllabus,
};
const viewSyllabusDeatilRoutes = {
  path: config.routes.viewSyllabusDetail,
  component: viewSyllabusDetail,
};
const createSyllabusRoutes = {
  path: config.routes.createSyllabus,
  component: CreateSyllabus,
};
const ViewProgramRoutes = {
  path: config.routes.viewProgram,
  component: ViewProgram
}
const ViewProgramDetailRoutes = {
  path: config.routes.viewProgramDetail,
  component: ViewProgramDetail
}
const userListRoutes = {
  path: config.routes.userList,
  component: UserList,
};
const userPermissionRoutes = {
  path: config.routes.userPermission,
  component: UserPermission,
};

const createProgram = {
  path: config.routes.createProgram,
  component: CreateProgram,

};

const createProgramName = {
  path: config.routes.createProgramName,
  component: CreateProgramName,
};
const viewClassRoutes = {
  path: config.routes.viewClass,
  component: ViewClass,
};
const viewClassDetails = {
  path: config.routes.viewClassDetail,
  component: ViewClassDetails,
};
const createClassSearchProgram = {
  path: config.routes.searchProgram,
  component: SearchProgram,
};
const createClassFormClass = {
  path: config.routes.formClass,
  component: FormClass,
};
const createClassFormSave = {
  path: config.routes.formSave,
  component: FormSave,
};
const createClassContent = {
  path: config.routes.content,
  component: Content,
};
const createClassSyllabus = {
  path: config.routes.syllabus,
  component: Syllabus,
};
const createClass = {
  path: config.routes.createClass,
  component: CreateClass,
};

const trainingCalendarRoutes = {
  path: config.routes.trainingCalendar,
  component: TrainingCalendar,
};

const viewListProgram = {
  path: config.routes.viewListProgram,
  component: ListTrainingPrograms,
};

const studentRoutes = [
  homeRoutes,
  viewSyllabusRoutes,
  viewSyllabusDeatilRoutes,
  viewClassRoutes,
  viewClassDetails,
  createClassSearchProgram,
  createClassFormClass,
  createClassFormSave,
  createClassContent,
  createClassSyllabus,
  createClass,
  trainingCalendarRoutes,

  ViewProgramRoutes,
  ViewProgramDetailRoutes,

  viewListProgram,
  createProgram,
  createProgramName,

];

const trainerRoutes = [...studentRoutes, createSyllabusRoutes];

const classAdminRoutes = [...trainerRoutes, createSyllabusRoutes];

const superAdminRoutes = [...classAdminRoutes, userListRoutes, userPermissionRoutes];

// const superAdminRoutes = [
//     {
//         path: config.routes.home,
//         component: Home,
//     },
//     {
//         path: config.routes.viewSyllabus,
//         component: ViewSyllabus,
//     },
//     // {
//     //     path: config.routes.viewSyllabusDetail,
//     //     component: viewSyllabusDetail,
//     // },
//     {
//         path: config.routes.createSyllabus,
//         component: CreateSyllabus,
//     },
//     // {
//     //     path: config.routes.viewListProgram,
//     //     component: ViewListProgram,
//     // },
//     // {
//     //     path: config.routes.viewProgram,
//     //     component: ViewProgram,
//     // },
//     // {
//     //     path: config.routes.viewProgramDetail,
//     //     component: ViewProgramDetail,
//     // },
//     // {
//     //     path: config.routes.createProgram,
//     //     component: CreateProgram,
//     // },
//     // {
//     //     path: config.routes.createProgramName,
//     //     component: CreateProgramName,
//     // },
//     // {
//     //     path: config.routes.viewListProgramSyllabusDraft,
//     //     component: ViewListProgramDraft,
//     // },
//     // {
//     //     path: config.routes.viewClass,
//     //     component: ViewClass,
//     // },
//     // {
//     //     path: config.routes.createClass,
//     //     component: CreateClass,
//     // },
//     // {
//     //     path: config.routes.trainingCalendar,
//     //     component: TrainingCalendar,
//     // },
//     {
//         path: config.routes.userList,
//         component: UserList,
//     },
//     {
//         path: config.routes.userPermission,
//         component: UserPermission,
//     },
//     // {
//     //     path: config.routes.userInformation,
//     //     component: UserInformation,
//     // },
//     // {
//     //     path: config.routes.learningMaterials,
//     //     component: LearningMaterials,
//     // },
//     // {
//     //     path: config.routes.calendarDay,
//     //     component: CalendarDay,
//     // },
//     // {
//     //     path: config.routes.calendarWeek,
//     //     component: CalendarWeek,
//     // },
// ];

export { superAdminRoutes, classAdminRoutes, trainerRoutes, studentRoutes };
