import Keycloak from "keycloak-js";

// @TODO: Make it simple for now, in the future, the options `clientId`, `url`, .etc. will be provided from the environment.
class KeycloakAuthentication extends Keycloak {
  private static instance: KeycloakAuthentication;

  public static initialize() {
    if (this.instance) {
      return this.instance;
    }
    const service = new KeycloakAuthentication({
      clientId: "aural-solfege-web",
      realm: "aural-solfege",
      url: "http://localhost:8081/",
    });
    this.instance = service;

    return this.instance;
  }
}

export const authenticationService = KeycloakAuthentication.initialize();
