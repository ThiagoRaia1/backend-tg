import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { config } from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carrega as variáveis do .env automaticamente
    TypeOrmModule.forRoot(config),
    UsuarioModule,
    RoadmapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}