import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrerasModule } from './carreras/carreras.module';
import { SemestresModule } from './semestres/semestres.module';
import { MateriasModule } from './materias/materias.module';
import { ParalelosModule } from './paralelos/paralelos.module';
import { PeriodosModule } from './periodos/periodos.module';
import { SoftwaresModule } from './softwares/softwares.module';
import { DocentesModule } from './docentes/docentes.module';
import { TitulosModule } from './titulos/titulos.module';
import { LaboratoristasModule } from './laboratoristas/laboratoristas.module';
import { EdificiosModule } from './edificios/edificios.module';
import { PisosModule } from './pisos/pisos.module';
import { ObservacionesModule } from './observaciones/observaciones.module';
import { MaquinasModule } from './maquinas/maquinas.module';
import { AulasModule } from './aulas/aulas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoftwareAulasModule } from './software_aulas/software_aulas.module';
import { DetalleHorariosModule } from './detalle_horarios/detalle_horarios.module';
import { AccionesBdModule } from './acciones_bd/acciones_bd.module';
import { SugerenciasModule } from './sugerencias/sugerencias.module';
import { DetalleMateriasModule } from './detalle_materias/detalle_materias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CarrerasModule, SemestresModule, MateriasModule, ParalelosModule, PeriodosModule, SoftwaresModule, DocentesModule, TitulosModule, LaboratoristasModule, EdificiosModule, PisosModule, ObservacionesModule, MaquinasModule, AulasModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'horarios_fisei',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    SoftwareAulasModule,
    DetalleHorariosModule,
    AccionesBdModule,
    SugerenciasModule,
    DetalleMateriasModule,
    UsuariosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
