import { createModelSchema, primitive, date } from 'serializr';

class Announcement {
  constructor(content) {
    this.content = content;

    this.timestamp = new Date();
  }
}

createModelSchema(Announcement, {
  content: primitive(),
  timestamp: date(),
});

export default Announcement;
