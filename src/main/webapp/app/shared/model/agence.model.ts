export interface IAgence {
    id?: number;
    raisonSociale?: string;
    valider?: boolean;
}

export class Agence implements IAgence {
    constructor(public id?: number, public raisonSociale?: string, public valider?: boolean) {
        this.valider = this.valider || false;
    }
}
