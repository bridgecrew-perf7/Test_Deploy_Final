import axios from 'axios';
import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class PostService {
  http = new ApiService();

  constructor() {}

  async getFeaturedArticles(body: any) {
    return this.http.get([ENDPOINT.posts.recommend], body);
  }

  async getPublicArticles(body: any) {
    return this.http.get([ENDPOINT.posts.public], body);
  }

  async getFollowingPost(body: any) {
    return this.http.get([ENDPOINT.posts.index], body);
  }

  async getPost(id: string | number) {
    return this.http.get([`${ENDPOINT.posts.index}/${id}`]);
  }

  async getRecyclebin(body: any) {
    return this.http.get([ENDPOINT.posts.recyclebin], body);
  }

  async restoreDeletedPost(id: string | number) {
    return this.http.put([`${ENDPOINT.posts.index}/${id}/restore`]);
  }

  async createPost(body: any) {
    return this.http.post([ENDPOINT.posts.index], body);
  }

  async updatePost(body: any, id: string | number) {
    return this.http.put([`${ENDPOINT.posts.index}/${id}`], body);
  }

  async deletePost(id: number | string) {
    return this.http.delete([`${ENDPOINT.posts.index}/${id}`]);
  }

  async getDraft() {
    return this.http.get([ENDPOINT.posts.draft]);
  }

  async createDraft(body: any) {
    return this.http.post([ENDPOINT.posts.draft], body);
  }

  uploadImageInSignURL = (url, body) => {
    return axios.put(url, body);
  };
}
