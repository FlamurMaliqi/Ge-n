import React from 'react';
import Header from "../components/Header";
import QuickAccessForm from "../components/QuickAccessForm";

function Home() {
    return (
       <React.Fragment>
           <Header></Header>
               <section className="margin-bottom-10vh home-page-white-box">
                   <QuickAccessForm></QuickAccessForm>
               </section>
       </React.Fragment>
    )
}

export default Home;