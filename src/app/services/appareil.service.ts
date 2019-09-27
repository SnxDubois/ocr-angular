import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [];

  constructor(private httpClient: HttpClient) { }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allume';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'eteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allume';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'eteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpClient
    .put('https://ocr-angular-86569.firebaseio.com/appareils.json', this.appareils)
    .subscribe(
      () => {
        console.log('Enregistrement terminé!');
      },
      (error) => {
        console.log('Erreur ! :' + error);
      }
    );
  }

  getAppareilFromServer() {
    this.httpClient
    .get<any[]>('https://ocr-angular-86569.firebaseio.com/appareils.json')
    .subscribe(
      (response) => {
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
}
