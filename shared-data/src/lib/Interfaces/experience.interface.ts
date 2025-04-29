export interface IExperience {
    id?: number;
    company: string;
    position: string;    
    description: string;
    yearStart: string;
    yearEnd: string;
    createdAt?: string;
    tecnologias?: string[];
}