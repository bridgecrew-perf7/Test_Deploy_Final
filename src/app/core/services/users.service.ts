import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class UsersService {
  http = new ApiService();

  constructor() {}

  async getUserInfo(id: number | string) {
    return this.http.get([`${ENDPOINT.users.index}/${id}`]);
  }

  async getArticlesList(id: number | string) {
    return this.http.get([`${ENDPOINT.users.index}/${id}/posts`]);
  }
}
