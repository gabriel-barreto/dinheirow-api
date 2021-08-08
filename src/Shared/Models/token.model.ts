export class Token {
  private _token: string

  constructor({ token }: { token: string }) {
    this._token = token
  }

  public get value() {
    return this._token
  }
}
