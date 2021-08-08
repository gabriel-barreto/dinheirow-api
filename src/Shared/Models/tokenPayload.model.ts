type Params = { id: string; email: string }

export class TokenPayload {
  private _id: string
  private _email: string

  constructor({ id, email }: Params) {
    this._id = id
    this._email = email
  }

  public get value() {
    return { email: this._email, id: this._id }
  }
}
