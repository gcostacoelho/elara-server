import * as bcrypt from 'bcrypt';
import { UserDtoWithoutPass } from './Dtos/UserDtoWithoutPass';
import { List } from '../List/List';
import { Historic } from '../History/Historic';

export class User {
    private nome: string;
    private email: string;
    private dataNasc: Date;
    private lista?: List[];
    private historic: Historic[];
    private senha: string;


    constructor(nome: string, email: string, dataNasc: Date, senha: string, ) {
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.senha = senha;
    }

    /**
     * encriptyPassword
     */
    public async encriptyPassword(): Promise<string> {
        const saltOrRounds = 10;
        const password = this.senha;
        const hash = await bcrypt.hash(password, saltOrRounds);

        return hash;
    }

    /**
     * compareHashWithPass
     */
    public async compareHashWithPass(hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(this.senha, hash);

        return isMatch;
    }

    /**
     * getUserWithoutPass
     */
    public getUserWithoutPass(): UserDtoWithoutPass {
        return {
            "nome": this.nome,
            "email": this.email,
            "dataNascimento": this.dataNasc,
        }
    }
}