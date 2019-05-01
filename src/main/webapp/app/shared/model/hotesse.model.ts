export const enum Experience {
    DEBUTANT = 'DEBUTANT',
    AMATEUR = 'AMATEUR',
    PRO = 'PRO',
    PASSIONNE = 'PASSIONNE',
    EXPERIMENTE = 'EXPERIMENTE'
}

export const enum TypeHotesse {
    HOTESSE = 'HOTESSE',
    ANIMATRICE = 'ANIMATRICE'
}

export const enum Disponibilite {
    JOUR = 'JOUR',
    SOIR = 'SOIR',
    JOUR_SOIR = 'JOUR_SOIR'
}

export interface IHotesse {
    id?: number;
    taille?: number;
    poids?: number;
    experience?: Experience;
    type?: TypeHotesse;
    deplacement?: boolean;
    disponibilite?: Disponibilite;
}

export class Hotesse implements IHotesse {
    constructor(
        public id?: number,
        public taille?: number,
        public poids?: number,
        public experience?: Experience,
        public type?: TypeHotesse,
        public deplacement?: boolean,
        public disponibilite?: Disponibilite
    ) {
        this.deplacement = this.deplacement || false;
    }
}
