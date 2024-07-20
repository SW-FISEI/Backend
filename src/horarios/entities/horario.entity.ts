import { DetalleHorario } from "src/detalle_horarios/entities/detalle_horario.entity";
import { Periodo } from "src/periodos/entities/periodo.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('horarios')
export class Horario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "time", nullable: false })
    inicio: string

    @Column({ type: "time", nullable: false })
    fin: string

    @Column({ type: "varchar", length: 15, nullable: false })
    dia: string

    @Column({ type: "int", nullable: false })
    numero_dia: number

    @ManyToOne(() => Periodo, periodo => periodo.horarios, { nullable: false })
    @JoinColumn({ name: 'id_periodo' })
    periodo: Periodo

    @OneToMany(() => DetalleHorario, detalle_horario => detalle_horario.horario)
    detalle_horarios: DetalleHorario[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
