export interface PostInterface {
  id?: number;
  userId: number;
  title: string;
  body: string;
  favorite?: boolean | null;
}

let largestPostId: number = 0;

export class Post implements PostInterface {
  id = ++largestPostId;
  userId: number;
  title: string;
  body: string;
  favorite: boolean | null;
  
  constructor(id: number, userId: number, title: string, body: string) {
    if (id) {
      this.id = id;
      if (id > largestPostId) {
        largestPostId = id;
      }
    }
    this.userId = userId;
    this.title = title;
    this.body = body;
    this.favorite = Boolean(this.id % 2);
  }

}
