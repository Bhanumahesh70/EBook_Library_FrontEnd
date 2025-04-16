import React from 'react';
import { getUsers } from '../../../services/EntityServices/userService';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../../../services/types';

const UsersList = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const navigate = useNavigate();
  function handleClick(id: string) {
    navigate(`/ebook/users/${id}`);
  }
  const displayUserRole = (role: string) => {
    if (role === 'ROLE_USER') {
      return 'USER';
    } else if (role === 'ROLE_LIBRARIAN') {
      return 'LIBRARIAN';
    } else {
      return 'ADMIN';
    }
  };
  return (
    <div className="table-container ">
      <table className="table table-info table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>
            <th scope="col">Role</th>
            <th scope="col">Borrowed Books</th>
            <th scope="col">Edit User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Phone Number">{user.phoneNumber}</td>
              <td data-label="Address">{user.address}</td>
              <td data-label="Role">{displayUserRole(user.role)}</td>
              <td>
                <Link
                  to={`${user.id}/books`}
                  //state={{ publisherName: publisher?.name }}
                  className="btn btn-outline-primary"
                >
                  Books
                </Link>
              </td>
              <td>
                <Link
                  to={`/ebook/users/form`}
                  //state={{ publisherName: publisher?.name }}
                  className="btn btn-outline-primary"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
