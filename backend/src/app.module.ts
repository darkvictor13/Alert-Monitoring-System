import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['docker/.env', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE.toLowerCase() === 'true',
    }),
    UserModule,
    AuthModule,
    DeviceModule,
    AlertModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
