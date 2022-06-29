import CreateProjectPage from '../views/CreateProjectPage/CreateProjectPage';
import RoleManagePage from '../views/RoleManagePage/index';
import HomePage from '../views/HomePage/HomePage';
import LoginPage from '../views/LoginPage/LoginPage';
import PersonnelPage from '../views/PersonnelPage/PersonnelPage';
import PersonnelProfilePage from '../views/PersonnelProfilePage/PersonnelProfilePage';
import ProjectDetailsPage from '../views/ProjectDetailsPage/indexProjectDetail';
import ProjectPage from '../views/ProjectPage/indexGetAllProject';
import ProductPage from '../views/ProductPage/ProductPage';
import WorkDetailsPage from '../views/WorkDetailsPage/WorkDetailsPage';
import EditReportPage from '../views/ProjectDetailsPage/indexGetAllReport';
import EditProjectDetailsPage from '../views/ProjectDetailsPage/EditProejectDetailsPage';
import CreateRolePage from '../views/RoleManagePage/CreateRolePage';
import EditServicePage from '../views/ProductPage/EditServicePage';
import CreateServicePage from '../views/ProductPage/CreateServicePage';
import EditPersonnleProfile from '../views/PersonnelProfilePage/EditPersonnelProfile';
import CreatePersonnelPage from '../views/PersonnelPage/CreatePersonnelPage';
import CreateTaskPage from '../views/TaskPage/CreateTaskProject';
import CreateReportPage from '../views/ReportPage/CreateReportProject';
import CreateRequestPage from '../views/RequestPage/CreateRequestProject';
import UpdateTaskProject from '../views/TaskPage/UpdateTaskProject';
//import UpdateReportProject from '../views/ReportPage/UpdateReportProject';
import ReportDetailPage from '../views/ReportPage/indexReportDetail';
import UpdateReportProject from '../views/ReportPage/UpdateReportProject';

export const HOME_ROUTES = [
  {
    path: '/',
    name: 'Home Page',
    exact: true,
    component: HomePage,
  },
  {
    path: '/project',
    name: 'Project Page',
    exact: true,
    component: ProjectPage,
  },
  {
    path: '/projectDetails/:id',
    name: 'Project Details Page',
    exact: true,
    component: ProjectDetailsPage,
  },
  {
    path: '/reportDetails/:id',
    name: 'Report Details Page',
    exact: true,
    component: ReportDetailPage,
  },
  {
    path: '/createProject',
    name: 'Create Project Page',
    exact: true,
    component: CreateProjectPage,
  },
  {
    path: '/createTask/:id',
    name: 'Create Task Page',
    exact: true,
    component: CreateTaskPage,
  },
  {
    path: '/createReport/:id',
    name: 'Create Report Page',
    exact: true,
    component: CreateReportPage,
  },
  {
    path: '/createRequest/:id',
    name: 'Create Request Page',
    exact: true,
    component: CreateRequestPage,
  },
  {
    path: '/personnel',
    name: 'Personnel Page',
    exact: true,
    component: PersonnelPage,
  },
  {
    path: '/personnelProfile',
    name: 'Personnel Profile Page',
    exact: true,
    component: PersonnelProfilePage,
  },
  {
    path: '/roleManage',
    name: 'Role Manage Page',
    exact: true,
    component: RoleManagePage,
  },
  {
    path: '/product',
    name: 'Product Page',
    exact: true,
    component: ProductPage,
  },
  {
    path: '/workDetails',
    name: 'Work Details Page',
    exact: true,
    component: WorkDetailsPage,
  },
  {
    path: '/editReport',
    name: 'Edit Report Page',
    exact: true,
    component: EditReportPage,
  },
  {
    path: '/editProjectDetails/:id',
    name: 'Edit Project Details Page',
    exact: true,
    component: EditProjectDetailsPage,
  },
  {
    path: '/updateReportDetails/:id',
    name: 'Update Report Details Page',
    exact: true,
    component: UpdateReportProject,
  },
  {
    path: '/createRole',
    name: 'Create Role Page',
    exact: true,
    component: CreateRolePage,
  },
  {
    path: '/editService',
    name: 'Edit Service Page',
    exact: true,
    component: EditServicePage,
  },
  {
    path: '/createService',
    name: 'Create Service Page',
    exact: true,
    component: CreateServicePage,
  },
  {
    path: '/editPersonnelProfile',
    name: 'Edit Personnel Profile Page',
    exact: true,
    component: EditPersonnleProfile,
  },
  {
    path: '/createPersonnel',
    name: 'Create Personnel Page',
    exact: true,
    component: CreatePersonnelPage,
  },
  {
    path: '/updateTask',
    name: 'Update Task Page',
    exact: true,
    component: UpdateTaskProject,
  },
];

export const LOGIN_ROUTES = [
  {
    path: '/login',
    name: 'Login Page',
    exact: true,
    component: LoginPage,
  },
];
