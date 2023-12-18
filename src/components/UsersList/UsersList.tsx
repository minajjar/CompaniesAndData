import React from "react";
import './UsersList.css';

interface User {
    id: string;
    name: string;
}

interface UserListProps {
    users: User[];
}
interface UserListProps {
    users: User[];
    onUserClick: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
    return (
        <div className="card-usrlst">
            <h1 className="h1">Users</h1>
            <ul className="user-ul">
                {users.map(user => (
                    <li className="user-li" key={user.id} onClick={() => onUserClick(user.id)}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;