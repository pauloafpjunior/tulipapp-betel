import { ContactPage } from './../contact/contact';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { LocalProvider } from '../../providers/local/local';
import { SharingProvider } from './../../providers/sharing/sharing';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public bulletins: any;
  public notification: boolean;
  private pushObject: PushObject;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private sharingProvider: SharingProvider,
    private restProvider: RestProvider, private localProvider: LocalProvider, private toastCtrl: ToastController,
    private push: Push) {

    const options: PushOptions = {
      android: {
        forceShow: 'true',
        sound: 'true'
      },
      ios: {},
      windows: {},
      browser: {}
    };

    this.pushObject = this.push.init(options);
    this.pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.bul_id) {
        this.navCtrl.push(ContactPage, {          
          bul_id: notification.additionalData.bul_id
        });
      } else {
        this.createToastMessage("Não foi possível carregar este boletim!");
      }
    });

  }

  doRefresh(refresher) {
    this.restProvider.getBulletins().subscribe(
      (data) => {
        this.bulletins = data;
        refresher.complete();
      }, (error) => {
        this.createToastMessage("Não foi possível carregar as informações...");
      }
    );
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

  private exists(bulletin, bulletins): boolean {
    for (let bul of bulletins) {
      if (bulletin.id == bul.id) {
        return true;
      }
    }
    return false;
  }

  shareBulletin(bulletin) {
    this.sharingProvider.shareBulletin(bulletin).then(() => {
      this.createToastMessage("Boletim compartilhado com sucesso!");
    }).catch((error) => {
      console.log(error);
      this.createToastMessage("Não foi possível compartilhar o boletim!");
    });
  }

  addFavorite(bulletin) {
    this.localProvider.getBulletins().then(
      (data) => {
        let favBulletins: any = data;
        if (this.exists(bulletin, favBulletins)) {
          this.createToastMessage("Este boletim já é um favorito seu.");
        } else {
          favBulletins.push(bulletin);
          this.localProvider.saveBulletins(favBulletins);
          this.createToastMessage("Boletim adicionado aos seus favoritos!")
        }
      }
    ).catch(
      (error) => {
        // First use of storage
        let favBulletins = new Array<any>();
        favBulletins.push(bulletin);
        this.localProvider.saveBulletins(favBulletins);
        this.createToastMessage("Boletim adicionado aos seus favoritos!");
      }
    );
  }

  viewBulletin(bulid) {
    this.navCtrl.push(ContactPage, {
      bul_id: bulid
    });
  }

  createLoading(msg) {
    let loading = this.loadingCtrl.create({
      content: msg
    });
    return loading;
  }

  changeNotification() {
    this.notification = !this.notification;
    this.localProvider.setNotification(this.notification);
    if (this.notification) {
      this.createToastMessage("Notificações habilitadas!");
      this.pushObject.subscribe('tulip_org_6');
    } else {
      this.createToastMessage("Notificações desabilitadas!");
      this.pushObject.unsubscribe('tulip_org_6');
    }
  }

  ionViewDidLoad() {
    this.localProvider.getNotification().then(
      (data) => {
        this.notification = data as boolean;
        if (this.notification) {
          this.pushObject.subscribe('tulip_org_6');
        } else {
          this.pushObject.unsubscribe('tulip_org_6');
        }
      }
    ).catch(
      (error) => {
        // First use of storage
        this.notification = true;
        this.localProvider.setNotification(this.notification);
      }
    );

    let loading = this.createLoading("Carregando boletins...");
    loading.present();
    this.restProvider.getBulletins().subscribe(
      (data) => {
        loading.dismiss();
        this.bulletins = data;
      }, (error) => {
        loading.dismiss();
        this.createToastMessage("Não foi possível carregar as informações...");
      }
    );
  }

}
