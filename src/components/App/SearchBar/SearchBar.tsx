import React from 'react';

import { Form } from 'semantic-ui-react';

interface SearchBarProps {
  currentSearch: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ currentSearch, setSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.search.value);
    setSearch(e.currentTarget.search.value);
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
        placeholder="Search..."
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
