import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

  private API_BASE_URL: string = 'https://ec2-54-233-120-231.sa-east-1.compute.amazonaws.com/tulipweb/api/';

  constructor(public http: HttpClient) {
  }

  public getBulletins(page?: number, query?: string) {
    if (page) {
      return this.http.get(this.API_BASE_URL + '/bulletins?org_id=6&p=' + page);
    } else if (query) {
      return this.http.get(this.API_BASE_URL + '/bulletins?org_id=6&q=' + query);
    } else {
      return this.http.get(this.API_BASE_URL + '/bulletins?org_id=6');
    }
  }

  public getSections(bul_id: number) {
    return this.http.get(this.API_BASE_URL + '/sections?bul_id=' + bul_id);
  }

}
