import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class SharingProvider {

  private BASE_SHARING_URL: string = 'https://ec2-54-233-120-231.sa-east-1.compute.amazonaws.com/tulipweb/bulletins/view/';

  constructor(private socialSharing: SocialSharing) {

  }

  shareBulletin(bulletin) {
    let msg = bulletin.title + " | " + bulletin.subtitle;
    let bulletin_url = this.BASE_SHARING_URL + bulletin.id;
    return this.socialSharing.share(msg, 'TulipApp', null, 'https://ec2-54-233-120-231.sa-east-1.compute.amazonaws.com/tulipweb/bulletins/view/6');
  }
}
