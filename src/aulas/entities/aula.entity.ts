import { Caracteristicas } from "src/common/enum/caracteristicas.enum";
import { DetalleHorario } from "src/detalle_horarios/entities/detalle_horario.entity";
import { DetallePiso } from "src/detalle_pisos/entities/detalle_piso.entity";
import { Maquina } from "src/maquinas/entities/maquina.entity";
import { SoftwareAula } from "src/software_aulas/entities/software_aula.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('aulas')
export class Aula {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @Column({ type: "int", nullable: false })
    cantidad_pc: number;

    @Column({ type: "int", nullable: false })
    capacidad: number;

    @Column({ type: "enum", enum: Caracteristicas, nullable: false })
    proyector: Caracteristicas;

    @Column({ type: "enum", enum: Caracteristicas, nullable: false })
    aire: Caracteristicas;

    @Column({ type: "varchar", length: 150, nullable: false })
    descripcion: string;

    @ManyToOne(() => DetallePiso, detalle_piso => detalle_piso.aula, { nullable: false })
    @JoinColumn({ name: 'id_detalle_piso' })
    detalle_piso: DetallePiso;

    @OneToMany(() => Maquina, maquina => maquina.aula, { cascade: true })
    maquinas: Maquina[];

    @OneToMany(() => SoftwareAula, software_aula => software_aula.aula, { cascade: true })
    software_aula: SoftwareAula[]

    @OneToMany(() => DetalleHorario, detalle_horario => detalle_horario.aula, { cascade: true })
    detalle_horarios: DetalleHorario[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}