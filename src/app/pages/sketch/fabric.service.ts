import { Injectable } from "@angular/core";
declare const fabric: any;


@Injectable({
    providedIn: 'root'
})
export class FabricService {

    private initFabric = false;

    constructor() { }

    async getFabricObject(): Promise<any> {
        try {
            if (!this.initFabric) {
                await this.loadFabricJS(); // Ensures fabric.js is loaded
            }
            return fabric;
        } catch (error) {
            console.error('Error loading fabric.js:', error);
            throw new Error('Failed to load fabric.js');
        }
    }

    private loadFabricJS(): Promise<void> {
        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = 'assets/js/fabric.min.js';
            scriptElement.onload = () => {
                this.initFabric = true; // Mark fabric.js as loaded
                resolve();
            };
            scriptElement.onerror = (error) => {
                console.error('Error loading fabric.js:', error);
                reject(new Error('Error loading fabric.js script'));
            };
            document.body.appendChild(scriptElement);
        });
    }
}