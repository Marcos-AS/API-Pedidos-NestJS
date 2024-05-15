import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comprador } from '../entities/comprador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador) private compradorRepo: Repository<Comprador>,
  ) {}
}
