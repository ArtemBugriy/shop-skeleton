import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Simple health endpoint for Docker healthchecks
  // (we avoid bringing in additional deps by registering directly on the underlying http server)
  const instance = app.getHttpAdapter().getInstance() as {
    get: (
      path: string,
      handler: (_req: unknown, res: { send: (body: string) => void }) => void,
    ) => void;
  };

  instance.get('/health', (_req, res) => {
    res.send('ok');
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

void bootstrap();
