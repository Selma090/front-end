import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {

  public kc!: KeycloakInstance;

  constructor() {}

  async init() {
    console.log("Security Initialization");
    this.kc = new Keycloak({
      url: "http://localhost:8080",
      realm: "test-realm",
      clientId: "AngularTestApp"
    });
    await this.kc.init({
      onLoad: 'login-required'
      //onLoad: 'check-sso'
      //promiseType:native
    });
    console.log(this.kc.token);
  }

  getToken(): string {
    if (this.kc.token) {
      return this.kc.token;
    } else {
      throw new Error('Token is undefined');
    }
  }

}
