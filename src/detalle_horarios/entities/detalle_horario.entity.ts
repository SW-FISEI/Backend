import { Aula } from "src/aulas/entities/aula.entity";
import { Dias } from "src/common/enum/dias.enum";
import { DetalleMateria } from "src/detalle_materias/entities/detalle_materia.entity";
import { Docente } from "src/docentes/entities/docente.entity";
import { Periodo } from "src/periodos/entities/periodo.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('detalle_horarios')
export class DetalleHorario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "time", nullable: false })
    inicio: string

    @Column({ type: "time", nullable: false })
    fin: string

    @Column({ type: 'enum', enum: Dias, nullable: false })
    dia: Dias

    @ManyToOne(() => Aula, aula => aula.detalle_horarios)
    @JoinColumn({ name: 'id_aula' })
    aula: Aula;

    @ManyToOne(() => Periodo, periodo => periodo.detalle_horario)
    @JoinColumn({ name: 'id_periodo' })
    periodo: Periodo;

    @ManyToOne(() => DetalleMateria, detalle_materia => detalle_materia.detalle_horarios)
    @JoinColumn({ name: 'id_materia' })
    materia: DetalleMateria;

    @ManyToOne(() => Docente, docente => docente.detalle_horarios)
    @JoinColumn({ name: 'id_docente' })
    docente: Docente;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
