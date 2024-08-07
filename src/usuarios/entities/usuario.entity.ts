import { Rol } from "src/common/enum/rol.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    contrasenia: string;

    @Column({ type: 'enum', enum: Rol, default: Rol.USER, nullable: false })
    rol: Rol;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
