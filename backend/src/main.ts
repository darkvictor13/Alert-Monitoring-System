import { NestFactory } from '@nestjs/core';
import { DataSource, LessThanOrEqual } from 'typeorm';
import { AppModule } from './app.module';
import { SessionEntity } from './session/session.entity';
import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.connectMicroservice({
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

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        // TODO: test with httpOnly: true
        httpOnly: false,
      },
      store: new TypeormStore({
        cleanupLimit: 5,
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const swaggerConfig = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Api TCC')
    .setDescription('Endpoints para o TCC')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');

  await app.listen(4000);
}

bootstrap();
