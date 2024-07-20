import { Horario } from "src/horarios/entities/horario.entity";
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

    @OneToMany(() => Horario, horario => horario.periodo)
    horarios: Horario[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
