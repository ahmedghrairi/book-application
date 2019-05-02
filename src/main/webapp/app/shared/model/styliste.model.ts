export const enum Experience {
    DEBUTANT = 'DEBUTANT',
    AMATEUR = 'AMATEUR',
    PRO = 'PRO',
    PASSIONNE = 'PASSIONNE',
    EXPERIMENTE = 'EXPERIMENTE'
}

export interface IStyliste {
    id?: number;
    experience?: Experience;
}

export class Styliste implements IStyliste {
    constructor(public id?: number, public experience?: Experience) {}
}
