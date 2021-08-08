import { Express, Router } from 'express'

export type RouterInjectionFn = (app: Express | Router) => void
