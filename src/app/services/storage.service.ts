// storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'selectedOption';

  constructor() {}

  setValue(value: string): void {
    localStorage.setItem(this.storageKey, value);
  }

  getValue(): string {
    return localStorage.getItem(this.storageKey) || '';
  }
}
