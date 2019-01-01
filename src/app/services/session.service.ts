import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { MyAuthService } from '../services/my-auth.service'

export interface IName {
  name:string
  userID: string
}

export interface INameID extends IName { id: string }

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private afs: AngularFirestore, private myAuth:MyAuthService) { }

  get nameCollection(){
    return this.afs.collection('names', (ref)=> {return ref.where('userID', '==', this.myAuth.user.uid)})
  }

  upload(names){
    return this.nameCollection.add({userID: this.user.uid,...names})
  }

  get names(){
  return  this.nameCollection.snapshotChanges().pipe(map(this.includeCollectionID))
  }

  get(id:string) {
    return this.nameCollection.doc(id).get()
    .pipe(map(
      (payload) => {
        return {id:id, ...payload.data()} as INameID;
    }
    ));
  }


  includeCollectionID(docChangeAction){
    return docChangeAction.map((a)=>{
      const data = a.payload.doc.data()
      const id = a.payload.doc.id;
      return {id,...data}
    })
  }

  delete(names:INameID){
    this.nameCollection.doc(names.id).delete();
  }

  update(names:INameID){
    this.nameCollection.doc(names.id).update({
      name: names.name
    })
  }

  get user(){
    return this.myAuth.user
  }
}
