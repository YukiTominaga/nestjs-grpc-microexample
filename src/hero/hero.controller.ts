import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  Hero,
  HeroById,
  HeroesServiceController,
  HeroesServiceControllerMethods,
} from './hero';

@HeroesServiceControllerMethods()
@Controller('hero')
export class HeroController implements HeroesServiceController {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(
    request: HeroById,
    metadata?: Metadata,
  ): Hero | Promise<Hero> | Observable<Hero> {
    console.log(metadata);
    return this.items.find(({ id }) => id === request.id);
  }
}
