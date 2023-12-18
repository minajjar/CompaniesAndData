import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, doc, updateDoc } from '../../providers/firebase';
import './CompanisAndUsers.css';
interface Company {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
    companyId: string;
}

interface CompaniesAndUsersProps {
    refreshData: boolean;
    setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompaniesAndUsers: React.FC<CompaniesAndUsersProps> = ({ refreshData, setRefreshData }) => {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const companiesSnapshot = await getDocs(collection(db, "companies"));
            const companiesData: Company[] = companiesSnapshot.docs.map(doc => ({
                ...doc.data() as Company,
                id: doc.id
            }));

            const usersSnapshot = await getDocs(collection(db, "users"));
            const usersData: User[] = usersSnapshot.docs.map(doc => ({
                ...doc.data() as User,
                id: doc.id
            }));

            setCompanies(companiesData);
            setUsers(usersData);
        };

        fetchData();
    }, [refreshData]);

    const getUsersForCompany = (companyId: string) => {
        return users.filter(user => user.companyId === companyId);
    };

    const deAssignUser = async (userId: string) => {
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { companyId: "" });
            alert("The user has been deassigned from the company!");
            console.log(`User ${userId} de-assigned from company`);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Error de-assigning user: ", error);
        }
    };

    return (
        <div className='card-uc'>
            {companies.map(company => (
                <div key={company.id}>
                    <h3 className='h1'>{company.name}</h3>
                    <ul className='uc-ul'>
                        {getUsersForCompany(company.id).map(user => (
                            <li className='uc-li' key={user.id} onClick={() => deAssignUser(user.id)}>{user.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CompaniesAndUsers;
