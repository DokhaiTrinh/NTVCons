import React from 'react';
import { StateProvider } from '../../common/StateProvider/StateProvider';
import RoleManagePage from './RoleManagePage';

const RolePageContainer = () => {
  const initialState = {
    loading: false,
    pageNo: 0,
    pageSize: 15,
    sortBy: 'roleId',
    sortType: true,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          loading: action.newLoading,
        };
      case 'CHANGE_PAGENO':
        return {
          ...state,
          pageNo: action.newPageNo,
        };
      case 'CHANGE_PAGESIZE':
        return {
          ...state,
          pageSize: action.newPageSize,
        };
      case 'CHANGE_SORTBY':
        return {
          ...state,
          sortBy: action.newSortBy,
        };
        case 'CHANGE_SORTTYPE':
        return {
          ...state,
          sortType: action.newSortType,
        };
      default:
        break;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <RoleManagePage />
    </StateProvider>
  );
};
export default RolePageContainer;
