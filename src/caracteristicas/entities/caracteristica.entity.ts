import { Aula } from "src/aulas/entities/aula.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('caracteristicas')
export class Caracteristica {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    cantidad_pc: number;

    @Column({ type: "int", nullable: false })
    capacidad: number;

    @Column({ type: "boolean", nullable: false })
    proyector: boolean;

    @Column({ type: "boolean", nullable: false })
    aire: boolean;

    @Column({ type: "varchar", length: 150, nullable: false })
    descripcion: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
