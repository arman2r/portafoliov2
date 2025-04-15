export interface IExperience {
    id?: number;
    empresa: string;
    inicio: string;
    fin: string;
    puesto: string;
    descripcion: string;
    tecnologias?: string[];
}