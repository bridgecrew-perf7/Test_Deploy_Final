import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class ReactionService {
  http = new ApiService();

  constructor() {}

  async getListUserLiked(id: string | number) {
    return this.http.get([`${ENDPOINT.posts.index}/${id}/likes`]);
  }

  async likePost(id: string | number) {
    return this.http.put([`${ENDPOINT.posts.index}/${id}/likes`]);
  }

  async getListUserCommented(id: string | number) {
    return this.http.get([`${ENDPOINT.posts.index}/${id}/comments`]);
  }

  async commentPost(body: any, id: string | number) {
    return this.http.post([`${ENDPOINT.posts.index}/${id}/comments`], body);
  }
}
