import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { SessionEntity } from './session/session.entity';
import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: 'ReaLlyS3cr3tT0k3nT4tN0b0dyC4nGue55',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
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
