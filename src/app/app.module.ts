import { CoreModule } from '@/core';
import { TestModule } from '@/test';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule, TestModule],
})
export class AppModule {}
