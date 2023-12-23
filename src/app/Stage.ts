import { Etudiant } from "./Etudiant";

export interface Stage {
    id: number;
    sujet: string;
    organismeDaccueil: string;
    type: string;
    dateDeDebut: Date;
    dateFin: Date;
    etudiant: Etudiant; // Assuming you have an Etudiant interface
  //  encadrant: Professeur; // Assuming you have a Professeur interface
    // jurys: Professeur[]; // Assuming you have a Professeur interface
  }