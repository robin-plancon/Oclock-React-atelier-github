import { Card, Image } from 'semantic-ui-react';
import { Repo } from '../../../@types';

interface ReposResultsProps {
  reposList: Repo[];
}

function ReposResults({ reposList }: ReposResultsProps) {
  return (
    <Card.Group
      itemsPerRow={3}
      stackable
      textAlign="left"
      centered
      style={{ margin: '1rem' }}
    >
      {reposList.map((repo) => (
        <Card key={repo.id} href={repo.html_url} target="_blank">
          <Image src={repo.owner.avatar_url} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{repo.name}</Card.Header>
            <Card.Meta>{repo.owner.login}</Card.Meta>
            <Card.Description>{repo.description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

export default ReposResults;
