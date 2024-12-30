import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderPackage from "../components/HeaderPackage";
import ComparisonTable from "../components/ComparisonTable";

function PackagesPage() {
    const location = useLocation();
    const { selectedTeams, data } = location.state || { selectedTeams: [], data: [] };
    return (
       <React.Fragment>
           <HeaderPackage></HeaderPackage>
           <div >
               <ComparisonTable selectedTeams={selectedTeams} data={data} /> 
           </div>
       </React.Fragment>
    );
}

export default PackagesPage;
