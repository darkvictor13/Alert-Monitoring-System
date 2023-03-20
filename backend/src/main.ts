import { NestFactory } from '@nestjs/core';
import { DataSource, LessThanOrEqual } from 'typeorm';
import { AppModule } from './app.module';
import { SessionEntity } from './session/session.entity';
import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  /*
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });
  */

  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  const configService = app.get(ConfigService);

  await sessionRepository.delete({
    expiredAt: LessThanOrEqual(Date.now()),
  });

  // delete all sessions
  //await sessionRepository.delete({});

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
      },
      store: new TypeormStore({
        cleanupLimit: 5,
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(4000);
}

bootstrap();
