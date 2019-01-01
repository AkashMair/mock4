import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { SessionService, IName, INameID} from '../services/session.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  names: Observable<IName[]>;
  constructor(private myAuth:MyAuthService, private session: SessionService) {
    this.names = this.session.names;
   }

   logout(){
     this.myAuth.logout()
   }

   upload(names:IName){
     this.session.upload(names)
   }

   delete(name:INameID){
     this.session.delete(name)
   }

   update(names:INameID){
     this.session.update(names);
   }
  
  ngOnInit() {
  }

}
