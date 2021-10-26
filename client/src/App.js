import React from 'react';

import './App.scss';
import AddPeople from './components/AddPeople';
import TablaUI from './components/TablaUI';

const App = () => {
    return (
        <div className="App">
            <AddPeople />
            <TablaUI />
        </div>
    );
}

export default App;