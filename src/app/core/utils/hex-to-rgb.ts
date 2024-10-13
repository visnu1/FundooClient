export function hexToRGB(hex: string, opacity = 1) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    if (hex.length !== 6) {
        throw new Error("Invalid hex color format");
    }

    const r = parseInt(hex.substring(0, 2), 16); //converts the hexadecimal value to decimal equivalent
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r},${g},${b}, ${opacity})`;
}