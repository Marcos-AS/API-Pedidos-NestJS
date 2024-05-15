import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fabricante } from '../entities/fabricante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectRepository(Fabricante)
    private fabricanteRepo: Repository<Fabricante>,
  ) {}
}
