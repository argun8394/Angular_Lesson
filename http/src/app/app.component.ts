import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //generic type <{name: string}> optional dır ama önerilen kullanımdır
    this.http.post<{name: string}>('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json',postData).subscribe((response)=>{
      console.log(response)
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    /*this.http.get('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json').subscribe
    (posts=>{
      console.log(posts
        )
    })//Response Data yı dönüştürmek için aşağıdaki şekilde RxJs operatörlerini kullanma
    */

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
      this.loadedPosts = posts;
    })

  }
}
