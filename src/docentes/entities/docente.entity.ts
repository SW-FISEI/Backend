import { DetalleHorario } from "src/detalle_horarios/entities/detalle_horario.entity";
import { Titulo } from "src/titulos/entities/titulo.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('docentes')
export class Docente {

    @PrimaryColumn()
    cedula: number

    @Column({ type: 'varchar', length: 150, nullable: false })
    docente: string

    @ManyToOne(() => Titulo, titulo => titulo.docente, { nullable: false })
    @JoinColumn({ name: 'id_titulo' })
    titulo: Titulo;

    @OneToMany(() => DetalleHorario, detalle_horario => detalle_horario.docente)
    detalle_horarios: DetalleHorario[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
