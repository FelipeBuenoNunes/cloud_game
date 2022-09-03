import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 50
    })
    name: string

    @Column({
        length: 132
    })
    password: string

    @Column({
        length: 42
    })
    user_side_public_key: string

    @Column({
        length: 42
    })
    wallet_public_key: string

    @Column({
        length: 66
    })
    wallet_private_key: string
}
