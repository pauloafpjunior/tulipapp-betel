import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

  private API_BASE_URL: string = 'http://ec2-18-222-213-66.us-east-2.compute.amazonaws.com/api/';

  constructor(public http: HttpClient) {
  }

  public getBulletins() {
    return this.http.get(this.API_BASE_URL + '/bulletins?org_id=6');
  }

  public getSections(bul_id: number) {
    return this.http.get(this.API_BASE_URL + '/sections?bul_id=' + bul_id);
  }

}
