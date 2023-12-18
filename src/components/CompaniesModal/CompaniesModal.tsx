import React from "react";
import './CompaniesModal.css';

interface Company {
    id: string;
    name: string;
}

interface CompaniesModalProps {
    companies: Company[];
    onSelectCompany: (companyId: string) => void;
    onClose: () => void;
}

const CompaniesModal: React.FC<CompaniesModalProps> = ({ companies, onSelectCompany, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className="h1">Select a Company</h2>
                <ul className="modal-ul">
                    {companies.map((company: Company) => (
                        <li className="modal-li" key={company.id} onClick={() => onSelectCompany(company.id)}>
                            {company.name}
                        </li>
                    ))}
                </ul>
                <button className="button" onClick={onClose}> Close </button>
            </div>
        </div>
    );
};

export default CompaniesModal;
