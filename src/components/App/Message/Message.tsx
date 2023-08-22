import { Message } from 'semantic-ui-react';

interface MessageProps {
  messageText: string;
}

function MessageContainer({ messageText }: MessageProps) {
  return (
    <Message style={{ margin: '1rem' }}>
      <Message.Header>{messageText}</Message.Header>
    </Message>
  );
}

export default MessageContainer;
