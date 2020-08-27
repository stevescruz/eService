import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generateUserToken(user_id: string): Promise<UserToken>;
}
