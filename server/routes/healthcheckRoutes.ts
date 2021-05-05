import { Router } from 'express'
import { healthcheck } from '../controllers/healthcheckController'

export const router = Router()

router.get('/healthcheck', healthcheck)
