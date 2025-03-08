import React from 'react';
import { getUsers } from '../../services/userService';
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
};
const UsersList = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

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
              <td data-label="Role">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
