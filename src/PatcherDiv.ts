import { Patcher } from "./Patcher";


export class PatcherDiv {
    private readonly div: HTMLDivElement;
    private readonly mainLabel: HTMLLabelElement;
    private readonly romInput: HTMLInputElement;
    private readonly romFilenameSpan: HTMLSpanElement;
    private readonly selectRomButton: HTMLButtonElement;
    private readonly patchRomButton: HTMLButtonElement;

    public constructor() {
        this.div = document.createElement("div");
        this.div.id = "rom-patcher-div";

        this.mainLabel = document.createElement("label");

        this.mainLabel.className = "patcher-form";
        this.mainLabel.htmlFor = "rom-input";
        this.mainLabel.textContent = "Select your Final Fantasy V ROM file (.smc):";

        this.romInput = document.createElement("input");

        this.romInput.className = "patcher-form";
        this.romInput.id = "rom-input";
        this.romInput.type = "file";
        this.romInput.accept = ".smc";
        this.romInput.hidden = true;

        this.romFilenameSpan = document.createElement("span");

        this.romFilenameSpan.className = "patcher-form";
        this.romFilenameSpan.id = "rom-filename";
        this.romFilenameSpan.textContent = "No ROM selected";

        this.selectRomButton = document.createElement("button");

        this.selectRomButton.className = "patcher-form";
        this.selectRomButton.id = "select-rom-button";
        this.selectRomButton.textContent = "Select ROM";

        this.patchRomButton = document.createElement("button");

        this.patchRomButton.className = "patcher-form";
        this.patchRomButton.id = "patch-rom-button";
        this.patchRomButton.textContent = "Patch ROM";
        this.patchRomButton.disabled = true;
        this.patchRomButton.hidden = true;

        this.div.appendChild(this.mainLabel);
        this.div.appendChild(this.romInput);
        this.div.appendChild(this.romFilenameSpan);
        this.div.appendChild(this.selectRomButton);
        this.div.appendChild(this.patchRomButton);

        this.addListeners();
    }

    public getDiv(): HTMLDivElement {
        return this.div;
    }

    private addListeners(): void {
        this.addSelectRomButtonListener();
        this.addRomInputChangeListener();
        this.addPatchRomButtonListener();
    }

    private addSelectRomButtonListener(): void {
        this.selectRomButton.addEventListener("click", () => {
            this.romInput.click();
        });
    }

    private addRomInputChangeListener(): void {
        // When the file is selected, change the rom-filename span text to the name of the file
        this.romInput.addEventListener("change", (event) => {
            const input: HTMLInputElement = event.target as HTMLInputElement;
            const file: File | undefined = input.files?.[0];

            if (file) {
                this.romFilenameSpan.textContent = file.name;
                this.selectRomButton.textContent = "Change ROM";
                this.patchRomButton.disabled = false;
                this.patchRomButton.hidden = false;
            }
        });
    }

    private addPatchRomButtonListener(): void {
        this.patchRomButton.addEventListener("click", async () => {
            const file: File | undefined = this.romInput.files?.[0];

            if (!file) {
                const errorDiv: HTMLDivElement | null = document.getElementById("error-div") as HTMLDivElement | null;
                
                if (errorDiv) {
                    errorDiv.textContent = "Please select a ROM file first.";
                }

                return;
            }

            const romBytes: ArrayBuffer = await file.arrayBuffer();
            const patcher: Patcher = new Patcher(romBytes);

            if (!(await patcher.validateRomHash())) {
                const errorDiv: HTMLDivElement | null = document.getElementById("error-div") as HTMLDivElement | null;

                if (errorDiv) {
                    errorDiv.textContent = "The selected ROM file is not a valid Final Fantasy V ROM.";
                }

                return;
            }

            const patchedRomBytes: ArrayBuffer = await patcher.getPatchedRomBytes();
            const blob: Blob = new Blob([patchedRomBytes], { type: "application/octet-stream" });
            const url: string = URL.createObjectURL(blob);
            const a: HTMLAnchorElement = document.createElement("a");

            const patchedRomFilename: string = file.name.replace(/\.sfc$/i, "_autohaste.sfc");

            a.href = url;
            a.download = patchedRomFilename;

            a.click();

            URL.revokeObjectURL(url);

            this.romInput.value = "";
            this.romFilenameSpan.textContent = "No ROM selected";
            this.selectRomButton.textContent = "Select ROM";
            this.patchRomButton.disabled = true;
            this.patchRomButton.hidden = true;
        });
    }
}
