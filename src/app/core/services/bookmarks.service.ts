import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class BookmarksService {
  http = new ApiService();

  constructor() {}

  async getBookmarks() {
    return this.http.get([ENDPOINT.bookmarks.index]);
  }

  async toggleBookmarks(body: any) {
    return this.http.post([ENDPOINT.bookmarks.index], body);
  }
}
