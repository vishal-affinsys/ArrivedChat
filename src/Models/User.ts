interface IUser {
  name: string;
  number: string;
  imageUrl: string;
  lastMessage: string;
  lastMessageTimestamp: string;
}

export const friendsImage =
  'https://img.icons8.com/3d-fluency/94/null/user-male-circle.png';

export const userImage = 'https://image.ibb.co/k0wVTm/profile_pic.jpg';
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
            imageUrl: friendsImage,
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
