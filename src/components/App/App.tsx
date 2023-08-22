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

  const [messageText, setMessageText] = useState('');

  const [reposList, setReposList] = useState(repos.items);

  // useEffect(() => {
  //   setMessageText('Hello World');
  // }, []);

  useEffect(() => {
    if (isSubmitted) {
      // console.log('isSubmitted');
      if (currentSearch === '') {
        setMessageText('Please enter a search term');
        setReposList(repos.items);
      } else {
        // console.log('fetch');
        // fetch(`https://api.github.com/search/repositories?q=${currentSearch}`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     // console.log(data);
        //     if (data.items.length === 0) {
        //       setMessageText('No results');
        //     } else {
        //       setReposList(data.items);
        //     }
        //   });
        const filteredRepos = repos.items.filter((repo) => {
          const regex = new RegExp(currentSearch, 'gi');
          return repo.name.match(regex);
        });
        if (filteredRepos.length === 0) {
          setMessageText('No results');
        } else {
          setMessageText(
            `La recherche a donné ${filteredRepos.length} résultats`
          );
          setReposList(filteredRepos);
        }
      }
      setIsSubmitted(false);
    }
  }, [isSubmitted, currentSearch]);

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
      <SearchBar
        currentSearch={currentSearch}
        setSearch={setSearch}
        setIsSubmitted={setIsSubmitted}
      />
      {messageText !== '' && <MessageContainer messageText={messageText} />}
      <ReposResults reposList={reposList} />
    </div>
  );
}

export default App;
