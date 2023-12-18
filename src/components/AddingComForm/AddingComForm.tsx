import React, { useState } from "react";
import { db, addDoc, collection, serverTimestamp } from '../../providers/firebase';
import './AddingComForm.css';

interface AddComFormProps {
    onCompanyAdded: () => void;
}

const AddComForm: React.FC<AddComFormProps> = ({ onCompanyAdded }) => {
    const [companyName, setCompanyName] = useState<string>('');

    const storeCompanyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(event.target.value);
    }

    const handleCompanySaving = async () => {
        try {
            await addDoc(collection(db, "companies"), {
                name: companyName,
                timestamp: serverTimestamp()
            });
            console.log("Company added: " + companyName);
            onCompanyAdded();
            setCompanyName("");
            alert("Company Inserted!");
        } catch (error) {
            console.error("Error adding company: ", error);
        }
    };

    return (
        <div className="card-com">
            <h1 className="h1"> Add A Company</h1>
            <form>
                <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={companyName}
                    onChange={storeCompanyName}
                />
                <button type="button" onClick={handleCompanySaving}>Save</button>
            </form>
        </div>
    );
};

export default AddComForm;
