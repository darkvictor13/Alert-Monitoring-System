import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { SessionEntity } from './session/session.entity';
import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  app.use(
    session({
      secret: 'this is a secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        // 1 week
        //maxAge: 1000 * 60 * 60 * 24 * 7,
        // 1 minute
        maxAge: 1000 * 60,
      },
      store: new TypeormStore({
        cleanupLimit: 5,
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
