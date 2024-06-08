import { Module } from '@nestjs/common';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos, ProductoSchema } from './entities/productos.entity';
import { Fabricante } from './entities/fabricante.entity';
import { Categoria } from './entities/categoria.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto } from './entities/producto.entity';
import { ProductoService } from './services/producto.service';
import { ProductoController } from './controllers/producto.controller';
import { CategoriaService } from './services/categoria.service';
import { FabricanteService } from './services/fabricante.service';
import { Categorias, CategoriaSchema } from './entities/categorias.entity';
import { Fabricantes, FabricanteSchema } from './entities/fabricantes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Fabricante, Categoria]),
    MongooseModule.forFeature([
      {
        name: Productos.name,
        schema: ProductoSchema,
      },
      {
        name: Categorias.name,
        schema: CategoriaSchema,
      },
      {
        name: Fabricantes.name,
        schema: FabricanteSchema,
      },
    ]),
  ],
  controllers: [
    FabricantesController,
    CategoriasController,
    ProductosController,
    ProductoController, //mongo
  ],
  providers: [
    ProductosService,
    CategoriasService,
    FabricantesService,
    ProductoService,
    CategoriaService,
    FabricanteService, //mongo
  ],
  exports: [ProductosService, ProductoService],
})
export class ProductosModule {}
