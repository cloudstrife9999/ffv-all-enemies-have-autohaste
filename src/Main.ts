import { PatcherDiv } from "./PatcherDiv";
import { ErrorDiv } from "./ErrorDiv";
import { WelcomeDiv } from "./WelcomeDiv";


export class Main {
    public static async main(): Promise<void> {
        Main.addErrorDiv();
        Main.addWelcomeDiv();
        Main.addPatcherDiv();
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
}
