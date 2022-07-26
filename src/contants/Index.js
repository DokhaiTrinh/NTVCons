import CreateProjectPage from '../views/CreateProjectPage/CreateProjectPage';
import RoleManagePage from '../views/RoleManagePage/index';
import HomePage from '../views/HomePage/HomePage';
import LoginPage from '../views/LoginPage/LoginPage';
import PersonnelPage from '../views/PersonnelPage/indexGetAllUser';
import PersonnelProfilePage from '../views/PersonnelProfilePage/PersonnelProfilePage';
import ProjectDetailsPage from '../views/ProjectDetailsPage/indexProjectDetail';
import ProjectPage from '../views/ProjectPage/indexGetAllProject';
import ProductPage from '../views/ProductPage/indexPostPage';
import WorkDetailsPage from '../views/WorkDetailsPage/WorkDetailsPage';
import EditReportPage from '../views/ProjectDetailsPage/indexGetAllReport';
import EditProjectDetailsPage from '../views/ProjectDetailsPage/EditProejectDetailsPage';
import CreateRolePage from '../views/RoleManagePage/CreateRolePage';
import EditServicePage from '../views/ProductPage/EditServicePage';
import CreateProductPage from '../views/ProductPage/CreateProductPage';
import EditPersonnleProfile from '../views/PersonnelProfilePage/EditPersonnelProfile';
import CreatePersonnelPage from '../views/PersonnelPage/CreatePersonnelPage';
import CreateWorkerPage from '../views/PersonnelPage/CreateWorker';
import CreateTaskPage from '../views/TaskPage/CreateTaskProject';
import CreateReportPage from '../views/ReportPage/CreateReportProject';
import CreateRequestPage from '../views/RequestPage/CreateRequestProject';
import ReportDetailPage from '../views/ReportPage/indexReportDetail';
import UpdateReportProject from '../views/ReportPage/UpdateReportProject';
import RequestDetailPage from '../views/RequestPage/RequestDetailPage';
import UpdateRequestPage from '../views/RequestPage/UpdateRequest';
import UpdateTaskPage from '../views/TaskPage/UpdateTaskProject';
import TaskDetailPage from '../views/TaskPage/TaskDetailPage';
import UpdateProductPage from '../views/ProductPage/UpdateProductPage';
import CategoryPageManage from '../views/CategoryPage/indexCategoryPage';
import CreateCategoryPage from '../views/CategoryPage/CreateCategoryPage';

export const HOME_ROUTES = [
  {
    path: '/home',
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
    path: '/requestDetails/:id',
    name: 'Request Details Page',
    exact: true,
    component: RequestDetailPage,
  },
  {
    path: '/taskDetails/:id',
    name: 'Task Details Page',
    exact: true,
    component: TaskDetailPage,
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
    path: '/createCategory/',
    name: 'Create Category Page',
    exact: true,
    component: CreateCategoryPage,
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
    path: '/categoryManage',
    name: 'Category Manage Page',
    exact: true,
    component: CategoryPageManage,
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
    path: '/updateRequestDetails/:id',
    name: 'Update Request Details Page',
    exact: true,
    component: UpdateRequestPage,
  },
  {
    path: '/updateTask/:id',
    name: 'Update Task  Page',
    exact: true,
    component: UpdateTaskPage,
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
    path: '/createProduct',
    name: 'Create Product Page',
    exact: true,
    component: CreateProductPage,
  },
  {
    path: '/updateProduct/:id',
    name: 'Update Product Page',
    exact: true,
    component: UpdateProductPage,
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
    path: '/createWorker',
    name: 'Create Worker Page',
    exact: true,
    component: CreateWorkerPage,
  },
  {
    path: '/updateTask',
    name: 'Update Task Page',
    exact: true,
    component: UpdateTaskPage,
  },
];

export const LOGIN_ROUTES = [
  {
    path: '/',
    name: 'Login Page',
    exact: true,
    component: LoginPage,
  },
];
