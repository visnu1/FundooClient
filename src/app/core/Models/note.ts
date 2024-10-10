export interface NoteLabel {
    _id: string;
    name: string;
    useriD?: string;
}


export interface Note {
    _id?: string;
    userId?: string,
    title: string;
    description: string;
    color: string;
    archive: boolean;
    pinned: boolean;
    trash: boolean;
    labels: NoteLabel[] | string[];
    noteType: 'plain' | 'list';
    updatedAt?: Date;
    reminder: Date | string;
    index?: number;
    __v?: number;
}