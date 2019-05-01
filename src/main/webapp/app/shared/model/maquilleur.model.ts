export const enum Experience {
    DEBUTANT = 'DEBUTANT',
    AMATEUR = 'AMATEUR',
    PRO = 'PRO',
    PASSIONNE = 'PASSIONNE',
    EXPERIMENTE = 'EXPERIMENTE'
}

export interface IMaquilleur {
    id?: number;
    experience?: Experience;
}

export class Maquilleur implements IMaquilleur {
    constructor(public id?: number, public experience?: Experience) {}
}
