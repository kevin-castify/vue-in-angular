import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../Post';
import { ref, computed } from 'vue';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Post[] = [];
  postsPerPage = 9;
  page = ref(0);
  offset = computed(() => ((this.page.value - 1) * this.postsPerPage));
  currentPosts = computed(() => this.posts.slice(this.offset.value, this.offset.value + this.postsPerPage));
  totalPages = computed(() => this.page.value && Math.ceil(this.posts.length / this.postsPerPage));
  
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts.map(post => new Post(post.id, post.userId, post.title, post.body));
      this.page.value = 1;
    })    
  }

  previousPage() {
    if (this.page.value > 1) {
      --this.page.value;
    } else {
      this.page.value = 1;
    }
  }
  
  nextPage() {
    if (this.page.value < this.totalPages.value) {
      ++this.page.value;
    } else {
      this.page.value = this.totalPages.value;
    }
  }

  toggleFavorite(postId: number) {
    const post: Post | undefined = this.posts.find(posts => posts.id === postId)
    if (post) {
      post.favorite = !post.favorite;
    }
  }
}
