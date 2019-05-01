import { IStylePhoto } from 'app/shared/model/style-photo.model';

export const enum Experience {
    DEBUTANT = 'DEBUTANT',
    AMATEUR = 'AMATEUR',
    PRO = 'PRO',
    PASSIONNE = 'PASSIONNE',
    EXPERIMENTE = 'EXPERIMENTE'
}

export interface IPhotographe {
    id?: number;
    experience?: Experience;
    stylePhotos?: IStylePhoto[];
}

export class Photographe implements IPhotographe {
    constructor(public id?: number, public experience?: Experience, public stylePhotos?: IStylePhoto[]) {}
}
