import { IModele } from 'app/shared/model/modele.model';
import { IPhotographe } from 'app/shared/model/photographe.model';

export interface IStylePhoto {
    id?: number;
    nom?: string;
    modeles?: IModele[];
    photographes?: IPhotographe[];
}

export class StylePhoto implements IStylePhoto {
    constructor(public id?: number, public nom?: string, public modeles?: IModele[], public photographes?: IPhotographe[]) {}
}
