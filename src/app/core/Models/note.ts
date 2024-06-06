export interface NoteLabel {
    _id: string;
    name: string;
    useriD?: string;
}


export interface Note {
    _id: string;
    title: string;
    description: string;
    color: string;
    archive: boolean;
    pinned: boolean;
    trash: boolean;
    labels: NoteLabel[];
    updatedAt: Date;
    reminder: Date;
    index: number;
    __v: number;
}