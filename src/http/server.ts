import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { goalsRoutes } from '../routes/goals.routes'
import { userRoutes } from '../routes/users.routes'
import fastifyCors from '@fastify/cors'
import { env } from '../env'

const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: env.FRONTEND_URL,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(goalsRoutes)
app.register(userRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server is running on port 3333')
  })
