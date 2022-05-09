import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  Empty,
  Hero,
  HeroById,
  HeroesServiceController,
  HeroesServiceControllerMethods,
  HeroList,
} from './hero';

@HeroesServiceControllerMethods()
@Controller('hero')
export class HeroController implements HeroesServiceController {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(request: HeroById): Hero | Promise<Hero> | Observable<Hero> {
    return this.items.find(({ id }) => id === request.id);
  }

  @GrpcMethod('HeroesService', 'GetAll')
  getAll(request: Empty): Promise<HeroList> | Observable<HeroList> | HeroList {
    return { heroes: this.items };
  }
}
