import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
