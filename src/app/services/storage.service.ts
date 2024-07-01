// storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  setValue(id: string, value: string): void {
    localStorage.setItem(id, value);
  }

  getValue(id: string): string {
    return localStorage.getItem(id) || '';
  }

}