import { Module } from '@nestjs/common';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Fabricante } from './entities/fabricante.entity';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Fabricante, Categoria])],
  controllers: [
    FabricantesController,
    CategoriasController,
    ProductosController,
  ],
  providers: [ProductosService, CategoriasService, FabricantesService],
  exports: [ProductosService],
})
export class ProductosModule {}
