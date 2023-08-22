import React, { useState } from 'react';

// import './App.scss';
import { Image } from 'semantic-ui-react';

import SearchBar from './SearchBar/SearchBar';

import repos from '../../data/repos';

function App() {
  const [currentSearch, setSearch] = useState('');
  // utiliser un state pour savoir si le formulaire a été soumis
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchResults, setSearchResults] = useState(repos);

  return (
    <div
      className="App"
      style={{
        width: '90%',
        height: '100vh',
        margin: '0 auto',
        backgroundColor: '#ecf0f1',
      }}
    >
      <header className="App-header">
        <Image
          src="src/assets/images/logo-github.png"
          size="small"
          style={{ padding: '1.5rem 0' }}
          centered
        />
      </header>
      <SearchBar currentSearch={currentSearch} setSearch={setSearch} />
    </div>
  );
}

export default App;
