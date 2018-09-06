import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public sections: any;
  public current_section: any = null;
  public bul_id: number;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
    private restProvider: RestProvider, private toastCtrl: ToastController, private navParams: NavParams) {
    this.bul_id = this.navParams.get('bul_id');
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

  createLoading(msg) {
    let loading = this.loadingCtrl.create({
      content: msg
    });
    return loading;
  }

  changeCurrentSection(section: any) {
    this.current_section = section;
  }

  public ionViewDidEnter() {
    let loading = this.createLoading("Carregando boletim...");
    loading.present();
    this.restProvider.getSections(this.bul_id).subscribe(
      (data) => {
        loading.dismiss();
        console.log(data);
        this.sections = data;
        if (this.sections.length > 0) {
          this.current_section = this.sections[0];
        }
      }, (error) => {
        loading.dismiss();
        this.createToastMessage('Não foi possível carregar as informações...');
      }
    );
  }

}
