import React from 'react';
import IconButtonCus from '../IconButtonCus';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { deleteRoleApi } from '../../../apis/Role/deleteRole';
import { useStateValue } from '../../../common/StateProvider/StateProvider';

export const DeleteRole = (roleId) => {
  const [{ loading }, dispatch] = useStateValue();
  const handleDeleteRole = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chứ?',
      text: 'Bạn không thể thu hổi lại khi ấn nút!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, hãy xóa nó!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRole(id);
      }
    });
  };
  const deleteRole = async (id) => {
    try {
      await deleteRoleApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Chức vụ đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) {}
  };
  return (
    <IconButtonCus
      onClick={() => handleDeleteRole(roleId)}
      icon={<DeleteIcon />}
    />
    // <DeleteButton onClick={() => handleDeleteUser(userId)}/>
  );
};

export default DeleteRole;
