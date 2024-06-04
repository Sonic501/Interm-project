import {
  ArrowDownIcon,
  ArrowLeftIcon,
  BiotechIcon,
  BookOpenIcon,
  CalendarToDayIcon,
  FolderIcon,
  GroupIcon,
  HomeIcon,
  SchoolIcon,
  SettingsIcon,
} from "../../components/Icons";
import config from "../../config";

const HomeSidebar = {
  title: "Home",
  path: config.routes.home,
  icon: <HomeIcon />,
  forStudent: true,
};
const SyllabusSidebar = {
  title: "Syllabus",
  path: config.routes.syllabus,
  icon: <BookOpenIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "View Syllabus",
      path: config.routes.viewSyllabus,
    },
    {
      title: "Create Syllabus",
      path: config.routes.createSyllabus,
    },
  ],
};

const SyllabusSidebarView = {
  title: "Syllabus",
  path: config.routes.syllabus,
  icon: <BookOpenIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "View Syllabus",
      path: config.routes.viewSyllabus,
    },
  ],
};

const TrainingProgramSidebar = {
  title: "Training program",
  path: config.routes.trainingProgram,
  icon: <BiotechIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "View program",
      path: config.routes.viewListProgram,
    },
    {
      title: "Create program",
      path: config.routes.createProgramName,
    },
  ],
};

const TrainingProgramSidebarView = {
  title: "Training program",
  path: config.routes.trainingProgram,
  icon: <BiotechIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "View program",
      path: config.routes.viewListProgram,
    },
  ],
};

const ClassSidebar = {
  title: "Class",
  path: config.routes.class,
  icon: <SchoolIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "View class",
      path: config.routes.viewClass,
    },
    {
      title: "Create class",
      path: config.routes.createClass,
    },
  ],
};
const ClassSidebarView = {
  title: "Class",
  path: config.routes.class,
  icon: <SchoolIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "View class",
      path: config.routes.viewClass,
    },
  ],
};
const TrainingCalendarSidebar = {
  title: "Training calendar",
  path: config.routes.trainingCalendar,
  icon: <CalendarToDayIcon />,
};
const UserManagement = {
  title: "User management",
  path: config.routes.user,
  icon: <GroupIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "User list",
      path: config.routes.userList,
    },
    {
      title: "User permission",
      path: config.routes.userPermission,
    },
  ],
};
const LearningMaterialSideBar = {
  title: "Learning materials",
  path: config.routes.learningMaterials,
  icon: <FolderIcon />,
  forStudent: true,
};
const Setting = {
  title: "Setting",
  path: config.routes.setting,
  icon: <SettingsIcon />,
  iconClosed: <ArrowDownIcon />,
  iconOpened: <ArrowLeftIcon />,

  subNav: [
    {
      title: "User information",
      path: config.routes.userInformation,
    },
  ],
};

// export const SidebarData = [
//   {
//     title: "Home",
//     path: config.routes.home,
//     icon: <HomeIcon />,
//     forStudent: true,
//   },
//   {
//     title: "Syllabus",
//     path: config.routes.syllabus,
//     icon: <BookOpenIcon />,
//     iconClosed: <ArrowDownIcon />,
//     iconOpened: <ArrowLeftIcon />,

//     subNav: [
//       {
//         title: "View Syllabus",
//         path: config.routes.viewSyllabus,
//       },
//       {
//         title: "Create Syllabus",
//         path: config.routes.createSyllabus,
//       },
//     ],
//   },
//   {
//     title: "Training program",
//     path: config.routes.trainingProgram,
//     icon: <BiotechIcon />,
//     iconClosed: <ArrowDownIcon />,
//     iconOpened: <ArrowLeftIcon />,

//     subNav: [
//       {
//         title: "View program",
//         path: config.routes.viewListProgram,
//       },
//       {
//         title: "Create program",
//         path: config.routes.createProgramName,
//       },
//     ],
//   },
//   {
//     title: "Class",
//     path: config.routes.class,
//     icon: <SchoolIcon />,
//     iconClosed: <ArrowDownIcon />,
//     iconOpened: <ArrowLeftIcon />,

//     subNav: [
//       {
//         title: "View class",
//         path: config.routes.viewClass,
//       },
//       {
//         title: "Create class",
//         path: config.routes.createClass,
//       },
//     ],
//   },
//   {
//     title: "Training calendar",
//     path: config.routes.calendarDay,
//     icon: <CalendarToDayIcon />,
//   },
//   {
//     title: "User management",
//     path: config.routes.user,
//     icon: <GroupIcon />,
//     iconClosed: <ArrowDownIcon />,
//     iconOpened: <ArrowLeftIcon />,

//     subNav: [
//       {
//         title: "User list",
//         path: config.routes.userList,
//       },
//       {
//         title: "User permission",
//         path: config.routes.userPermission,
//       },
//     ],
//   },
//   {
//     title: "Learning materials",
//     path: config.routes.learningMaterials,
//     icon: <FolderIcon />,
//     forStudent: true,
//   },
//   {
//     title: "Setting",
//     path: config.routes.setting,
//     icon: <SettingsIcon />,
//     iconClosed: <ArrowDownIcon />,
//     iconOpened: <ArrowLeftIcon />,

//     subNav: [
//       {
//         title: "User information",
//         path: config.routes.userInformation,
//       },
//     ],
//   },
// ];

const SidebarDataStudent = [HomeSidebar, SyllabusSidebarView, TrainingProgramSidebarView, ClassSidebarView, TrainingCalendarSidebar];
const SidebarDataTrainer = [HomeSidebar, SyllabusSidebar, LearningMaterialSideBar];
const SidebarDataClassAdmin = [...SidebarDataTrainer, TrainingCalendarSidebar, ClassSidebar, TrainingProgramSidebar];
const SidebarDataSuperAdmin = [...SidebarDataClassAdmin, UserManagement, Setting];

export { SidebarDataStudent, SidebarDataTrainer, SidebarDataClassAdmin, SidebarDataSuperAdmin };
