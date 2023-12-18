import React, { useState } from "react";
import { db, addDoc, collection, serverTimestamp } from '../../providers/firebase';
import './AddingUserForm.css';

interface AddingUserFormProps {
    onUserAdded: () => void;
}

const AddingUserForm: React.FC<AddingUserFormProps> = ({ onUserAdded }) => {
    const [userName, setUserName] = useState<string>('');

    const storeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const handleUserSaving = async () => {
        try {
            await addDoc(collection(db, "users"), {
                name: userName,
                timestamp: serverTimestamp()
            });
            console.log("User added: " + userName);
            setUserName('');
            onUserAdded();
            alert("User Added!");
        } catch (error) {
            console.error("Error adding User: ", error);
        }
    };

    return (
        <div className="card-com">
            <h1 className="h1"> Add A User</h1>
            <form>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={userName}
                    onChange={storeUserName}
                />
                <button type="button" onClick={handleUserSaving}>Save</button>
            </form>
        </div>
    );

};

export default AddingUserForm;