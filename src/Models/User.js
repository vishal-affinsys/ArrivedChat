class User {
  constructor({name, number, imageUrl, lastMessage, lastMessageTimestamp}) {
    this.name = name;
    this.number = number;
    this.imageUrl = imageUrl;
    this.lastMessage = lastMessage;
    this.lastMessageTimestamp = lastMessageTimestamp;
  }
}

export default User;
