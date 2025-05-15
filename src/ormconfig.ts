import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGODB_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
