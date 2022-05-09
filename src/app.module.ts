import { Module } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import {
  addReflectionToGrpcConfig,
  GrpcReflectionModule,
} from 'nestjs-grpc-reflection';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroController } from './hero/hero.controller';

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, 'hero/hero.proto'),
    url: 'localhost:50001',
  },
});

@Module({
  imports: [GrpcReflectionModule.register(grpcClientOptions)],
  controllers: [AppController, HeroController],
  providers: [AppService],
})
export class AppModule {}
