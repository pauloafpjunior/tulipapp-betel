import { SharingProvider } from './../../providers/sharing/sharing';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LocalProvider } from '../../providers/local/local';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public bulletins: any;

  constructor(public navCtrl: NavController, private localProvider: LocalProvider, 
    private toastCtrl: ToastController, private sharingProvider: SharingProvider) {   
  }

  private createToastMessage(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  shareBulletin(bulletin) {
    this.sharingProvider.shareBulletin(bulletin).then(() => {
      this.createToastMessage("Boletim compartilhado com sucesso!");
    }).catch(() => {
      this.createToastMessage("Não foi possível compartilhar o boletim!");
    });
  }

  viewBulletin(bulid) {
    this.navCtrl.push(ContactPage, {
      bul_id: bulid
    });
  }

  removeBulletin(bulletin) {
    let index = this.bulletins.indexOf(bulletin);
    this.bulletins.splice(index, 1);
    this.localProvider.saveBulletins(this.bulletins);
    this.createToastMessage("Boletim removido com sucesso!");
  }

  ionViewDidEnter() {
    this.localProvider.getBulletins().then(
      (data) => {
        this.bulletins = data;
      }
    ).catch(
      (error) => {
        this.createToastMessage("Não foi possível carregar seus favoritos!");
      }
    );
  }

}
