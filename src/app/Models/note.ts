export interface Note {
    _id: string;
    title: string;
    description: string;
    color: string;
    archive: boolean;
    pinned: boolean;
    trash: boolean;
    labels: string[];  
    updatedAt: Date;  
    reminder: Date;  
    index: number;
    __v: number;
}