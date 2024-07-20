import { Aula } from "src/aulas/entities/aula.entity";
import { DetalleMateria } from "src/detalle_materias/entities/detalle_materia.entity";
import { Docente } from "src/docentes/entities/docente.entity";
import { Horario } from "src/horarios/entities/horario.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('detalle_horarios')
export class DetalleHorario {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Aula, aula => aula.detalle_horarios)
    @JoinColumn({ name: 'id_aula' })
    aula: Aula;

    @ManyToOne(() => Horario, horario => horario.detalle_horarios)
    @JoinColumn({ name: 'id_horario' })
    horario: Horario;

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
