import { v4 as uuidv4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders(): Promise<User[]> {
    const { users } = this;

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    this.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    if (userIndex !== -1) {
      this.users[userIndex] = user;
    }
    if (userIndex === -1) {
      this.users.push(user);
    }

    return user;
  }
}

export default FakeUsersRepository;
