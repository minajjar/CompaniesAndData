import React, { useEffect, useState } from "react";
import AddComForm from "../../components/AddingComForm/AddingComForm";
import AddingUserForm from "../../components/AddingUserForm/AddingUserForm";
import UserList from "../../components/UsersList/UsersList";
import CompaniesList from "../../components/CompaniesList/CompaniesList";
import CompaniesModal from "../../components/CompaniesModal/CompaniesModal";
import CompaniesAndUsers from "../../components/CompaniesAndUsers/CompaniesAndusers";
import { db, collection, getDocs, doc, updateDoc } from '../../providers/firebase';
import './Home.css';

interface Company {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
}

const Home = () => {

    const [refreshData, setRefreshData] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUserClick = (userId: string) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const handleSelectCompany = async (companyId: string) => {
        if (selectedUserId) {
            const userRef = doc(db, "users", selectedUserId);

            try {
                await updateDoc(userRef, {
                    companyId: companyId
                });
                console.log(`User ${selectedUserId} assigned to company ${companyId}`);
                alert("Assigning Done!");
                setRefreshData(prev => !prev);
            } catch (error) {
                console.error("Error updating user: ", error);
            }
        }
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersArray: User[] = querySnapshot.docs.map(doc => ({
            ...doc.data() as User,
            id: doc.id
        }));
        setUsers(usersArray);
    };

    useEffect(() => {
        fetchCompanies();
        fetchUsers();
    }, []);

    const fetchCompanies = async () => {
        const querySnapshot = await getDocs(collection(db, "companies"));
        const companiesArray: Company[] = querySnapshot.docs.map(doc => ({
            ...doc.data() as Company,
            id: doc.id
        }));
        setCompanies(companiesArray);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <div>
            <div className="card-hp">
                <h1 className="h1"> Companies And Users</h1>
            </div>

            <div className="card-hps-container">
                <div className="card-hp">
                    <AddComForm onCompanyAdded={fetchCompanies} />
                </div>
                <div className="card-hp">
                    <AddingUserForm onUserAdded={fetchUsers} />
                </div>
            </div>
            <div className="card-hps-container">
                <div className="card-hp">
                    <CompaniesList companies={companies} />
                </div>
                <div className="card-hp">
                    <UserList users={users} onUserClick={handleUserClick} />
                </div>
            </div>
            <div className="card-hp"><CompaniesAndUsers refreshData={refreshData} setRefreshData={setRefreshData} /></div>
            {/* Modal */}
            {isModalOpen && (
                <CompaniesModal
                    companies={companies}
                    onSelectCompany={handleSelectCompany}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Home;