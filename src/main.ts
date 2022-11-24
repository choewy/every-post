import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app';
import { TestService } from './test';

(async () => {
  const app = await NestFactory.create(AppModule);

  const testService = app.get(TestService);

  await testService.saveTopWithMiddle();
  await testService.saveTopWithBottom();
  await testService.saveTopWithMiddleAndBottom();

  await testService.saveMiddleWithTopAndBottom();
  await testService.saveBottomWithTopAndMiddle();
})();
