import React, { useEffect, useState } from 'react';

// import './App.scss';
import { Image, Pagination, PaginationProps } from 'semantic-ui-react';

import SearchBar from './SearchBar/SearchBar';
import MessageContainer from './Message/Message';
import ReposResults from './ReposResults/ReposResults';

// import repos from '../../data/repos';
import { Repo } from '../../@types';

function App() {
  // currentSearch est la valeur de l'input de recherche
  const [currentSearch, setSearch] = useState('');
  // isSubmitted est un boolean qui permet de savoir si le formulaire a été soumis
  const [isSubmitted, setIsSubmitted] = useState(false);
  // messageText est le texte du message du composant Message
  const [messageText, setMessageText] = useState('');
  // reposList est la liste des repos à afficher
  const [reposList, setReposList] = useState<Repo[]>([]);
  // numberOfRepos est le nombre de résultats
  const [numberOfRepos, setNumberOfRepos] = useState(0);
  // page est le numéro de la page de résultats affichée
  const [page, setPage] = useState(1);

  // Si isSubmitted est true, on lance la requête
  useEffect(() => {
    if (isSubmitted) {
      if (currentSearch === '') {
        setMessageText('Veuillez entrer une recherche');
      } else {
        // Si la recherche est valide, on lance la requête à l'API
        fetch(
          `https://api.github.com/search/repositories?q=${currentSearch}&sort=stars&order=desc&page=${page}&per_page=9`
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            // On vérifie si la propriété items existe dans data
            if (!data.items) {
              if (
                data.message ===
                'API rate limit exceeded for 90.92.237.244. (But he…t. Check out the documentation for more details.)'
              ) {
                setMessageText(
                  'limite de requêtes atteinte, veuillez réessayer plus tard'
                );
              } else if (data.message) {
                setMessageText(data.message);
              } else {
                setMessageText('Pas de résultats');
              }
            } else {
              setMessageText(
                `La recherche a donné ${data.total_count} résultats`
              );
              setNumberOfRepos(data.total_count);
              setReposList(data.items);
            }
          });
        // const filteredRepos = repos.items.filter((repo) => {
        //   const regex = new RegExp(currentSearch, 'gi');
        //   return repo.name.match(regex);
        // });
        // if (filteredRepos.length === 0) {
        //   setMessageText('No results');
        // } else {
        //   setMessageText(
        //     `La recherche a donné ${filteredRepos.length} résultats`
        //   );
        //   setReposList(filteredRepos);
        // }
      }
      setIsSubmitted(false);
    }
  }, [isSubmitted, currentSearch, page]);

  // Si la page change, on modifie la valeur de page
  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ) => {
    // console.log(data.activePage);
    setPage(data.activePage as number);
    setIsSubmitted(true);
  };

  return (
    <div
      className="App"
      style={{
        width: '90%',
        minHeight: '100vh',
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
      {reposList.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            defaultActivePage={1}
            totalPages={Math.ceil(numberOfRepos / 9)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
