import React from 'react'

const PaginationUserItems = ({
  users,
  handelShowModalUpdate,
  handleLockOrUnLock,
  setErrorSearch,
}) => {
  return (
    <>
      <table className="table table-response ">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Tài khoản</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th style={{ minWidth: '180px' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userName}</td>
                <td>{user.roles}</td>
                {!user.isLock ? (
                  <td className="text-success fw-bold">Hoạt động</td>
                ) : (
                  <td className="text-danger fw-bold">khóa</td>
                )}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => handelShowModalUpdate(user.id)}
                  >
                    Sửa
                  </button>

                  {!user.isLock ? (
                    <button
                      onClick={() => handleLockOrUnLock(user.id, index)}
                      type="button"
                      className="btn btn-success btn-sm "
                    >
                      Khóa
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLockOrUnLock(user.id, index)}
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      Mở
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default PaginationUserItems
