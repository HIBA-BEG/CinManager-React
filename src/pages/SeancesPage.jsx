import React from 'react';
import SeanceList from '../components/SeanceList';
import Header from '../components/Header';

const SeancesPage = () => {
    return (
        <div>
            <Header/>
            <h1 className="text-4xl font-bold text-center my-8">Seances</h1>
            <SeanceList />
        </div>
    );
};

export default SeancesPage;
