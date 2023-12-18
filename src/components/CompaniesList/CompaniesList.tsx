import React from "react";
import './CompaniesList.css';

interface Company {
    id: string;
    name: string;
}

interface CompaniesListProps {
    companies: Company[];
}

const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
    return (
        <div className="card-comlst">
            <h1 className="h1">Companies</h1>
            <ul className="company-ul">
                {companies.map(company => (
                    <li className="company-li" key={company.id}>{company.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CompaniesList;
