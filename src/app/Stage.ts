import { Etudiant } from "./Etudiant";
import { Professeur } from "./Professeur";

export interface Stage {
    id: number;
    sujet: string;
    organismeDaccueil: string;
    type: string;
    dateDeDebut: Date;
    dateFin: Date;
    annee: string;
    etudiant: Etudiant; // Assuming you have an Etudiant interface
    encadrant: Professeur; // Assuming you have a Professeur interface
    jurys: Professeur[]; // Assuming you have a Professeur interface
    statut?: string;
  }
