type Params = {
  bio?: string | null
  email: string
  image?: string | null
  username: string
  following?: boolean
}

export class Profile {
  private _bio: string
  private _email: string
  private _image: string
  private _username: string
  private _following: boolean

  constructor({ bio, email, image, username, following }: Params) {
    this._bio = bio ?? ''
    this._image = image ?? ''
    this._following = following ?? false

    this._email = email
    this._username = username
  }

  public get following() {
    return this._following
  }

  public set following(value: boolean) {
    this._following = value
  }

  public get value() {
    return {
      bio: this._bio,
      email: this._email,
      image: this._image,
      username: this._username,
      following: this._following
    }
  }
}
