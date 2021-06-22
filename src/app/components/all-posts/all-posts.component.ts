import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../Post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Post[] = [];
  page = 1;
  postsPerPage = 9;
  totalPages = 0;
  offset = 0;
  currentPosts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts.map(post => new Post(post.id, post.userId, post.title, post.body));
      this.setCurrentPosts();
      this.setPagination();
    })
  }

  setCurrentPosts() {
    this.offset = (this.page - 1) * this.postsPerPage;
    this.currentPosts = this.posts.slice(this.offset, this.offset + this.postsPerPage);
  }

  setPagination() {
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
  }

  previousPage() {
    if (this.page > 1) {
      --this.page;
    } else {
      this.page = 1;
    }
    this.setCurrentPosts();
  }
  
  nextPage() {
    if (this.page < this.totalPages) {
      ++this.page;
    } else {
      this.page = this.totalPages;
    }
    this.setCurrentPosts();
  }

  toggleFavorite(postId: number) {
    const post: Post | undefined = this.posts.find(posts => posts.id === postId)
    if (post) {
      post.favorite = !post.favorite;
    }
  }
}
