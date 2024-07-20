
import { DetalleMateria } from "src/detalle_materias/entities/detalle_materia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('carreras')
export class Carrera {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    nombre: string

    @Column({ type: 'varchar', length: 100, nullable: false })
    descripcion: string

    @OneToMany(() => DetalleMateria, detalle_materia => detalle_materia.carrera)
    detalle_materias: DetalleMateria[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
