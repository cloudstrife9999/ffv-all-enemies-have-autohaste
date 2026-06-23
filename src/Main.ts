import { PatcherDiv } from "./PatcherDiv";
import { ErrorDiv } from "./ErrorDiv";
import { WelcomeDiv } from "./WelcomeDiv";
import { InfoDiv } from "./InfoDiv";


export class Main {
    public static async main(): Promise<void> {
        Main.addErrorDiv();
        Main.addWelcomeDiv();
        Main.addPatcherDiv();
        Main.addInfoDiv();
    }

    private static addPatcherDiv(): void {
        const patcherDiv: PatcherDiv = new PatcherDiv();

        if (patcherDiv) {
            document.body.appendChild(patcherDiv.getDiv());
        }
        else {
            console.error("Failed to create PatcherDiv.");
        }
    }

    private static addErrorDiv(): void {
        const errorDiv: ErrorDiv = new ErrorDiv();

        if (errorDiv) {
            document.body.appendChild(errorDiv.getDiv());
        }
        else {
            console.error("Failed to create ErrorDiv.");
        }
    }

    private static addWelcomeDiv(): void {
        const welcomeDiv: WelcomeDiv = new WelcomeDiv();

        if (welcomeDiv) {
            document.body.appendChild(welcomeDiv.getDiv());
        }
        else {
            console.error("Failed to create WelcomeDiv.");
        }
    }

    private static addInfoDiv(): void {
        const infoDiv: InfoDiv = new InfoDiv();

        if (infoDiv) {
            document.body.appendChild(infoDiv.getDiv());
        }
        else {
            console.error("Failed to create InfoDiv.");
        }
    }
}
