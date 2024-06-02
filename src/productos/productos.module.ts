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

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Fabricante, Categoria]),
    MongooseModule.forFeature([
      {
        name: Productos.name,
        schema: ProductoSchema,
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
    ProductoService, //mongo
    
  ],
  exports: [ProductosService, ProductoService],
})
export class ProductosModule {}
