import { Estado } from "src/common/enum/estado.enum";
import { DetalleHorario } from "src/detalle_horarios/entities/detalle_horario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('periodos')
export class Periodo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    nombre: string

    @Column({ type: "varchar", length: 7, nullable: false })
    inicioMes: string;

    @Column({ type: "varchar", length: 7, nullable: false })
    inicioAño: string;

    @Column({ type: "varchar", length: 7, nullable: false })
    finMes: string;

    @Column({ type: "varchar", length: 7, nullable: false })
    finAño: string;

    @Column({ type: "enum", enum: Estado, nullable: false })
    estado: Estado;

    @OneToMany(() => DetalleHorario, detalle_horario => detalle_horario.periodo, { cascade: true })
    detalle_horario: DetalleHorario[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
