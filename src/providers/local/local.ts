import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalProvider {

  private KEY_STORAGE_BULLETINS: string = "favBulletins";
  private KEY_STORAGE_NOTIFICATIONS: string = "notifications";

  constructor(private storage: Storage) {
  }

  getBulletins() {
    return this.storage.get(this.KEY_STORAGE_BULLETINS);
  }

  saveBulletins(bulletins) {
    this.storage.set(this.KEY_STORAGE_BULLETINS, bulletins);
  }

  getNotification() {
    return this.storage.get(this.KEY_STORAGE_NOTIFICATIONS);
  }

  setNotification(value: boolean) {
    return this.storage.set(this.KEY_STORAGE_NOTIFICATIONS, value);
  }
}
