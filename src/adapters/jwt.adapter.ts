import { JwtPayload, jwtDecode } from "jwt-decode";

export interface JwtAdapter {
  decode(token: string): JwtPayload;
}

export class JwtAdapterImpl {
  decode(token: string) {
    return jwtDecode(token);
  }
}
