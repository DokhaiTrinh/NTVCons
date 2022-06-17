// import React from 'react';
// import { StateProvider } from '../../common/StateProvider/StateProvider';
// import ProjectPage from './ProjectPage';

// const ProjectPageContainer = () => {
//   const initialState = {
//     loading: false,
//     pageNo: 0,
//     pageSize: 1,
//     sortBy: 'createdAt',
//     sortType: true,
//   };
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case 'LOADING':
//         return {
//           ...state,
//           loading: action.newLoading,
//         };
//       case 'CHANGE_PAGENO':
//         return {
//           ...state,
//           pageNo: action.newPageNo,
//         };
//       case 'CHANGE_PAGESIZE':
//         return {
//           ...state,
//           pageSize: action.newPageSize,
//         };
//       case 'CHANGE_SORTBY':
//         return {
//           ...state,
//           sortBy: action.newSortBy,
//         };
//         case 'CHANGE_SORTTYPE':
//         return {
//           ...state,
//           sortType: action.newSortType,
//         };
//       default:
//         break;
//     }
//   };
//   return (
//     <StateProvider initialState={initialState} reducer={reducer}>
//       <ProjectPage />
//     </StateProvider>
//   );
// };
// export default ProjectPageContainer;
