import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Trabalhador } from './trabalhador';

@Injectable({
  providedIn: 'root'
})
export class TrabalhadorService {
  collectionPath = "trabalhadores";

  items: Observable<Trabalhador[]>;
  constructor(private afs: AngularFirestore) {}

  get $data(): Observable<Trabalhador[]> {
    return this.afs.collection<Trabalhador>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  public getById(id: string): Observable<Trabalhador> {
    return this.afs.doc<any>(`${this.collectionPath}/${id}`).valueChanges().pipe(
      switchMap( doc => {
        return of({ id, ...doc });
      })
    );
  }
  
  public push(data: Trabalhador): Promise<DocumentReference> {
    return this.afs.collection<Trabalhador>(this.collectionPath).add({...data});
  }

  public remove(id: string): Promise<void> {
    return this.afs.doc<Trabalhador>(`${this.collectionPath}/${id}`).delete();
  }

  public set(id: string, data: Trabalhador): Promise<void> {
    return this.afs.doc<Trabalhador>(`${this.collectionPath}/${id}`).set(data);
  }

  public update(id: string, data: Trabalhador): Promise<void> {
    return this.afs.doc<Trabalhador>(`${this.collectionPath}/${id}`).update(data);
  }

}