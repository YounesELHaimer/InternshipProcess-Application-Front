import { Filiere } from "./Filiere";

export interface ChefFiliere {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    filiere: Filiere;  // Ajoutez cette propriété
  }