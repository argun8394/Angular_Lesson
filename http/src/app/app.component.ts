import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import { PostsService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  loadedPosts: Post[] = [];
  isFetching=false;
  error = null;
  private errorSub:Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage=>{
      this.error = errorMessage
    })

    //initial anında yükleme sağlar aşağıdakiler için
    this.isFetching=true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    //generic type <{name: string}> optional dır ama önerilen kullanımdır
   /* this.http.post<{name: string}>('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json',postData).subscribe((response)=>{
      console.log(response)
    })
    */
   this.postsService.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },
    error => {
      this.error=error.message;
      console.log(error)
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts=[];
    })
  }
/*
  private fetchPosts() {

    /*this.http.get('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json').subscribe
    (posts=>{
      console.log(posts
        )
    })//Response Data yı dönüştürmek için aşağıdaki şekilde RxJs operatörlerini kullanma
    */
   // this.isFetching= true;
    /*
    this.http.get< {[key: string]: Post}>('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json').pipe(
      map(responseData => {
        const postArray: Post[] = [];
        for(const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({...responseData[key],id:key});
          }
        }
        return postArray;
      }))
    .subscribe
    (posts=>{
      this.isFetching= false;
      this.loadedPosts = posts;
    })

  }*/

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
