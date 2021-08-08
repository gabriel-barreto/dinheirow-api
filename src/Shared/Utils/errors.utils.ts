import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from 'http-status'

type Err = {
  status: number
  code: string
  message: string
}

export const $errors = {
  duplicated: {
    status: BAD_REQUEST,
    code: 'DUPLICATED',
    message: 'O documento informado já está registrado em nossa base de dados.'
  },
  notFound: {
    status: NOT_FOUND,
    code: 'NOT_FOUND',
    message: 'Nenhum registro encontrado'
  },
  validationFails: {
    status: BAD_REQUEST,
    code: 'INVALID_PAYLOAD',
    message:
      'O corpo recebido não contém todos os valores esperados ou não contém os tipos adequeados.'
  },
  invalidToken: {
    status: UNAUTHORIZED,
    code: 'INVALID_TOKEN',
    message: 'O token informado é inválido!'
  },
  invalidPassword: {
    status: BAD_REQUEST,
    code: 'INVALID_PASSWORD',
    message: 'A senha informada está incorreta!'
  }
}

export function getErrByCode(code: string): Err {
  const error = Object.values($errors).find(({ code: each }) => each === code)
  return error as Err
}
