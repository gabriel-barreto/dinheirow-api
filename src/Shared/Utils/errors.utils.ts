import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status'

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
  invalidFormat: {
    status: BAD_REQUEST,
    code: 'INVALID_FORMAT',
    message: 'Os valores informados não correspondem aos tipos esperados.'
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
  paramsValidationFails: {
    status: BAD_REQUEST,
    code: 'INVALID_PARAMS',
    message:
      'Os parâmetros recebidos não contém todos os valores esperados ou não contém os tipos adequeados.'
  },
  tokenNotFound: {
    status: NOT_FOUND,
    code: 'TOKEN_NOT_FOUND',
    message: 'O token de autorização não foi informado'
  },
  invalidToken: {
    status: UNAUTHORIZED,
    code: 'INVALID_TOKEN',
    message: 'O token informado é inválido!'
  },
  invalidPassword: {
    status: UNAUTHORIZED,
    code: 'INVALID_PASSWORD',
    message: 'A senha informada está incorreta!'
  },
  invalidAccess: {
    status: FORBIDDEN,
    code: 'FORBIDDEN',
    message: 'O usuário autenticado não tem permissões suficientes!'
  },
  userStatusInvalid: {
    status: FORBIDDEN,
    code: 'USER_STATUS_INVALID',
    message: 'O usuário não tem permissões para entrar.'
  },
  serviceUnavailable: {
    status: 503,
    code: 'SERVICE_UNAVAILABLE',
    message: 'O serviço está indisponível no momento.'
  }
}

export function getErrByCode(code: string): Err {
  const error = Object.values($errors).find(({ code: each }) => each === code)
  return error as Err
}
