import { Responses } from '@/Shared/Helpers'
import { AuthHttpReq, Controller, HttpRes, View } from '@/Shared/Protocols'

export class CurrentUserController implements Controller {
  private view: View

  constructor({ view }: { view: View }) {
    this.view = view
  }

  async handle(request: AuthHttpReq): Promise<HttpRes> {
    const { user } = request
    return Responses.ok({ user: this.view.transformOne(user) })
  }
}
