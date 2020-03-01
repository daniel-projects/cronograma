import { Injectable } from '@angular/core';
import { Atividade } from './atividade';
import { Observable, of } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  collectionPath = "atividades";

  items: Observable<Atividade[]>;
  constructor(private afs: AngularFirestore) {}

  get $data(): Observable<Atividade[]> {
    return this.afs.collection<Atividade>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  public getById(id: string): Observable<Atividade> {
    return this.afs.doc<any>(`${this.collectionPath}/${id}`).valueChanges().pipe(
      switchMap( doc => {
        return of({ id, ...doc });
      })
    );
  }
  
  public push(data: Atividade): Promise<DocumentReference> {
    return this.afs.collection<Atividade>(this.collectionPath).add({...data});
  }

  public remove(id: string): Promise<void> {
    return this.afs.doc<Atividade>(`${this.collectionPath}/${id}`).delete();
  }

  public set(id: string, data: Atividade): Promise<void> {
    return this.afs.doc<Atividade>(`${this.collectionPath}/${id}`).set(data);
  }

  public update(id: string, data: Atividade): Promise<void> {
    return this.afs.doc<Atividade>(`${this.collectionPath}/${id}`).update(data);
  }
}
