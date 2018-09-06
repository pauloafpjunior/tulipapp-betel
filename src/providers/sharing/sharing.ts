import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class SharingProvider {

  private BASE_SHARING_URL: string = 'http://ec2-18-222-213-66.us-east-2.compute.amazonaws.com/bulletins/view/';

  constructor(private socialSharing: SocialSharing) {
    
  }

  shareBulletin(bulletin) {
    let msg = bulletin.title + " | " + bulletin.subtitle;
    let bulletin_url = this.BASE_SHARING_URL + bulletin.id;
    return this.socialSharing.share(msg, 'TulipApp', bulletin.image, bulletin_url);
  }

}
