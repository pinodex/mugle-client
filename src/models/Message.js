import { createModelSchema, primitive, date } from 'serializr';

class Message {
  constructor(sender, content) {
    this.sender = sender;

    this.content = content;

    this.timestamp = new Date();
  }
}

createModelSchema(Message, {
  sender: primitive(),
  content: primitive(),
  timestamp: date(),
});

export default Message;
