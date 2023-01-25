interface IUser {
  name: string;
  number: string;
  imageUrl: string;
  lastMessage: string;
  lastMessageTimestamp: string;
}
class User {
  name: string;
  number: string;
  imageUrl: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  constructor(user: IUser) {
    this.name = user.name;
    this.number = user.number;
    this.imageUrl = user.imageUrl;
    this.lastMessage = user.lastMessage;
    this.lastMessageTimestamp = user.lastMessageTimestamp;
  }
  static createUserFromContacts(contact: Array<any>) {
    let users = [];
    for (let i = 0; i < contact.length; i++) {
      if (contact[i].phoneNumbers[0] !== undefined) {
        users.push(
          new User({
            name: contact[i].displayName,
            number: contact[i].phoneNumbers[0].number,
            imageUrl:
              'https://img.icons8.com/3d-fluency/94/null/user-male-circle.png',
            lastMessage: '',
            lastMessageTimestamp: '',
          }),
        );
      }
    }
    return users;
  }
}

export default User;
