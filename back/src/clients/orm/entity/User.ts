import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index } from "typeorm"

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        length: 50
    })
    name: string

    @Column({
        length: 132
    })
    password: string

    @Column({
        unique: true,
        length: 42
    })
    user_side_public_key: string

    @Column({
        unique: true,
        length: 42
    })
    wallet_public_key: string

    @Column({
        unique: true,
        length: 66
    })
    wallet_private_key: string
}
