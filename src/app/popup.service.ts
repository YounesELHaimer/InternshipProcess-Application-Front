// popup.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  openPopup() {
    this.isOpenSubject.next(true);
  }

  closePopup() {
    this.isOpenSubject.next(false);
  }
}
