import { User } from '../models/User';
import { Subject } from 'rxjs';

export class UserService {
    private users: User[] = [
        new User('Seb', 'Dubois', 's.d@email.com', 'eau petillante', ['coder', 'boire du café'])
    ];
    userSubject = new Subject<User[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}
