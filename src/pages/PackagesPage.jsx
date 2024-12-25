import React from 'react';
import HeaderPackage from "../components/HeaderPackage";
import ComparisonTable from "../components/ComparisonTable"

function Home() {
    return (
       <React.Fragment>
           <HeaderPackage></HeaderPackage>
               <section className="margin-bottom-10vh">
                    <ComparisonTable></ComparisonTable>
               </section>
       </React.Fragment>
    )
}

export default Home;