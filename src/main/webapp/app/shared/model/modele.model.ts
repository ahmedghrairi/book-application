import { IStylePhoto } from 'app/shared/model/style-photo.model';

export const enum CouleurYeux {
    VERT = 'VERT',
    BLEU = 'BLEU',
    MIEL = 'MIEL'
}

export const enum CouleurCheveux {
    VERT = 'VERT',
    BLEU = 'BLEU',
    MIEL = 'MIEL'
}

export const enum Experience {
    DEBUTANT = 'DEBUTANT',
    AMATEUR = 'AMATEUR',
    PRO = 'PRO',
    PASSIONNE = 'PASSIONNE',
    EXPERIMENTE = 'EXPERIMENTE'
}

export const enum TypeModele {
    MODELE = 'MODELE',
    MANNEQUIN = 'MANNEQUIN'
}

export interface IModele {
    id?: number;
    taille?: number;
    poids?: number;
    pointure?: number;
    taillePoitrine?: number;
    tourDeTaille?: number;
    tourDeHanche?: number;
    couleurDesYeux?: CouleurYeux;
    couleurDeCheveux?: CouleurCheveux;
    experience?: Experience;
    type?: TypeModele;
    stylePhotos?: IStylePhoto[];
}

export class Modele implements IModele {
    constructor(
        public id?: number,
        public taille?: number,
        public poids?: number,
        public pointure?: number,
        public taillePoitrine?: number,
        public tourDeTaille?: number,
        public tourDeHanche?: number,
        public couleurDesYeux?: CouleurYeux,
        public couleurDeCheveux?: CouleurCheveux,
        public experience?: Experience,
        public type?: TypeModele,
        public stylePhotos?: IStylePhoto[]
    ) {}
}
