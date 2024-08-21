import { Carrera } from "src/carreras/entities/carrera.entity";
import { DetalleHorario } from "src/detalle_horarios/entities/detalle_horario.entity";
import { Materia } from "src/materias/entities/materia.entity";
import { Paralelo } from "src/paralelos/entities/paralelo.entity";
import { Semestre } from "src/semestres/entities/semestre.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('detalle_materia')
export class DetalleMateria {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Carrera, carrera => carrera.detalle_materias, { nullable: false })
    @JoinColumn({ name: 'id_carrera' })
    carrera: Carrera;

    @ManyToOne(() => Semestre, semestre => semestre.detalle_materias, { nullable: false })
    @JoinColumn({ name: 'id_semestre' })
    semestre: Semestre;

    @ManyToOne(() => Materia, materia => materia.detalle_materias, { nullable: false })
    @JoinColumn({ name: 'id_materia' })
    materia: Materia;

    @ManyToOne(() => Paralelo, paralelo => paralelo.detalle_materias, { nullable: false })
    @JoinColumn({ name: 'id_paralelo' })
    paralelo: Paralelo;

    @OneToMany(() => DetalleHorario, detalle_horario => detalle_horario.materia, { cascade: true })
    detalle_horarios: DetalleHorario[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
