/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Empty } from '../google/protobuf/empty';

export const protobufPackage = 'hero';

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export interface HeroList {
  heroes: Hero[];
}

export const HERO_PACKAGE_NAME = 'hero';

export interface HeroesServiceClient {
  findOne(request: HeroById): Observable<Hero>;

  getAll(request: Empty): Observable<HeroList>;
}

export interface HeroesServiceController {
  findOne(request: HeroById): Promise<Hero> | Observable<Hero> | Hero;

  getAll(request: Empty): Promise<HeroList> | Observable<HeroList> | HeroList;
}

export function HeroesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findOne', 'getAll'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('HeroesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('HeroesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const HEROES_SERVICE_NAME = 'HeroesService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
