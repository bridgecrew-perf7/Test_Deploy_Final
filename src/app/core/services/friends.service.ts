import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class FriendsService {
  http = new ApiService();

  constructor() {}

  async getFollowings(id: number | string) {
    return this.http.get([`${ENDPOINT.friends.index}/${id}/followings`]);
  }

  async getFollowers(id: number | string) {
    return this.http.get([`${ENDPOINT.friends.index}/${id}/followers`]);
  }

  async followUser(body: any) {
    return this.http.post([ENDPOINT.friends.follow], body);
  }
}
