import { Colors1, Colors2, Colors3, Colors4 } from "../constants/color.constants";

export type Color = typeof Colors1[number] | typeof Colors2[number] | typeof Colors3[number] | typeof Colors4[number];

export interface ToolOptions {
    size: number,
    shade?: Color
}
