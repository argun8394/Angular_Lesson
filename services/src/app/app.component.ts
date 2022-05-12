import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [AccountsService]//appComponent te provide edildiği için diğer componentlerde provide ihtiyacı yoktur inject edilip kullanılabilir
})
export class AppComponent implements OnInit {
  accounts :{name: string,status: string}[]=[];

  constructor(private accountsService:AccountsService){}

  ngOnInit(){
      this.accounts=this.accountsService.accounts;
  }


}
