import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import {Post} from './post.model'

@Injectable({providedIn: 'root'})
export class PostsService{
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string,content: string){
    const postData: Post= {title: title,content: content};
    this.http.post<{name: string}>('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json',postData,
    {//[*1] aşağıdaki delete kullandığımıza benzer
      //Observing Different Types of Responses
      observe:'response'//observe:'body' bu hali defaulttur response ta destekler bu value lar doğru yazılmazsa hata oluşur
    }
    ).subscribe((responseData)=>{
      console.log(responseData);
    }, error => {
      this.error.next(error.message)
    })
  }

  fetchPosts(){
    let searchParams= new HttpParams();// URL e sorgu parametrelerini ekleme işlemi
    searchParams =searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get< {[key: string]: Post}>('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json',
    {
      headers:new HttpHeaders({'Custom-Header': 'Hello'}),
      params:searchParams,
      responseType: 'json'
    }
    )
    .pipe(
      map(responseData => {
        const postArray: Post[] = [];
        for(const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({...responseData[key],id:key});
          }
        }
        return postArray;
      }),
      catchError(errorRes => {
        //send to analytics server
        return throwError(errorRes);
      }));

  }

  deletePosts(){
    return this.http.delete('https://ng-complete-guide-6c377-default-rtdb.firebaseio.com/posts.json',
    //[*1] her zaman kullanılan bir yapı değil ama yardımcı olan bir yapı aşağıda tap ile kullandık
    //Observing Different Types of Responses
    {
      observe:'events',//events dışında response ta alır //[*1]
      responseType: 'json',//json defaulttur (text te olabilir)
    } ).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Sent){//[*1]
        //...
      }
      if(event.type === HttpEventType.Response){//[*1]
        console.log(event.body)
      }
    }));
  }

  }


