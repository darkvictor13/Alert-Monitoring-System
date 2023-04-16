import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { NotifyModule } from './notify/notify.module';
import { MqttIntegrationModule } from './mqtt_integration/mqtt_integration.module';
import { MqttModule } from 'nest-mqtt';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotModule } from './telegram_bot/telegram_bot.module';
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
    MqttModule.forRoot({
      host: process.env.MQTT_HOST,
      port: parseInt(process.env.MQTT_PORT, 10),
      protocol: 'mqtt',
    }),
    TelegrafModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    DeviceModule,
    NotifyModule,
    MqttIntegrationModule,
    TelegramBotModule,
    AlertModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
