import React from 'react';

import { Form } from 'semantic-ui-react';

interface SearchBarProps {
  currentSearch: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar({
  currentSearch,
  setSearch,
  setIsSubmitted,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.search.value);
    setIsSubmitted(true);
  };

  return (
    <Form
      style={{
        backgroundColor: '#fff',
        margin: '0 1rem',
        padding: '1rem',
        borderRadius: '0.2rem',
        boxShadow: '0 0 1rem rgba(0, 0, 0, 0.2)',
      }}
      onSubmit={handleSubmit}
    >
      <Form.Input
        placeholder="Rechercher un repo"
        name="search"
        icon="search"
        iconPosition="left"
        value={currentSearch}
        // avec onChange on modifie uniquement la valeur de l'input
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSubmit}
      />
    </Form>
  );
}

export default SearchBar;
