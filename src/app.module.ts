import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega as variáveis do .env automaticamente
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuarioModule,
    RoadmapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
