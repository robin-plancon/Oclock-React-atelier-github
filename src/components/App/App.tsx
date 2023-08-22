import React, { useEffect, useState } from 'react';

// import './App.scss';
import { Image } from 'semantic-ui-react';

import SearchBar from './SearchBar/SearchBar';
import MessageContainer from './Message/Message';
import ReposResults from './ReposResults/ReposResults';

import repos from '../../data/repos';

function App() {
  const [currentSearch, setSearch] = useState('');
  // utiliser un state pour savoir si le formulaire a été soumis
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchResults, setSearchResults] = useState(repos);

  const [messageText, setMessageText] = useState('');

  const [reposList, setReposList] = useState(repos.items);

  // useEffect(() => {
  //   setMessageText('Hello World');
  // }, []);

  return (
    <div
      className="App"
      style={{
        width: '90%',
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
      {messageText !== '' && <MessageContainer messageText={messageText} />}
      <ReposResults reposList={reposList} />
    </div>
  );
}

export default App;
