import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma os dados de entrada para o tipo correto
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // retorna erro se tiver campos que não estão no DTO
    }),
  );
   // Habilitar CORS
   app.enableCors()

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()