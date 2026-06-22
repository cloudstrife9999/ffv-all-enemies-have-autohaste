import { Patcher } from "./Patcher";


export class PatcherDiv {
    private div!: HTMLDivElement;

    private romSelectorDiv!: HTMLDivElement;
    private romSelectorLabel!: HTMLLabelElement;
    private romSelectorInput!: HTMLInputElement;
    private romSelectorFilenameSpan!: HTMLSpanElement;
    private romSelectorButton!: HTMLButtonElement;

    private overrideDiv!: HTMLDivElement;
    private overrideLabel!: HTMLLabelElement;
    private overrideInput!: HTMLInputElement;

    private submitDiv!: HTMLDivElement;
    private patchRomButton!: HTMLButtonElement;

    public constructor() {
        this.createROMSelectorDiv();
        this.createOverrideDiv();
        this.createSubmitDiv();
        this.createContainerDiv();
        this.addListeners();
    }

    private createROMSelectorDiv(): void {
        this.romSelectorDiv = document.createElement("div");
        this.romSelectorDiv.id = "rom-selector-div";

        this.romSelectorLabel = document.createElement("label");
        this.romSelectorLabel.id = "rom-selector-label";
        this.romSelectorLabel.classList.add("with-margin");
        this.romSelectorLabel.htmlFor = "rom-selector-input";
        this.romSelectorLabel.textContent = "Select your Final Fantasy V ROM file (.smc/.sfc):";

        this.romSelectorInput = document.createElement("input");
        this.romSelectorInput.type = "file";
        this.romSelectorInput.id = "rom-selector-input";
        this.romSelectorInput.accept = ".smc,.sfc";
        this.romSelectorInput.hidden = true;

        this.romSelectorFilenameSpan = document.createElement("span");
        this.romSelectorFilenameSpan.id = "rom-selector-filename";
        this.romSelectorFilenameSpan.classList.add("with-margin");
        this.romSelectorFilenameSpan.textContent = "No ROM selected";

        this.romSelectorButton = document.createElement("button");
        this.romSelectorButton.id = "rom-selector-button";
        this.romSelectorButton.textContent = "Select ROM";

        this.romSelectorDiv.appendChild(this.romSelectorLabel);
        this.romSelectorDiv.appendChild(this.romSelectorInput);
        this.romSelectorDiv.appendChild(document.createElement("br"));
        this.romSelectorDiv.appendChild(this.romSelectorFilenameSpan);
        this.romSelectorDiv.appendChild(this.romSelectorButton);
    }

    private createOverrideDiv(): void {
        this.overrideDiv = document.createElement("div");
        this.overrideDiv.id = "override-div";

        this.overrideLabel = document.createElement("label");
        this.overrideLabel.classList.add("with-margin");
        this.overrideLabel.htmlFor = "override-input";
        this.overrideLabel.textContent = "Override the ROM hash check (use at your own risk):";

        this.overrideInput = document.createElement("input");
        this.overrideInput.classList.add("with-margin");
        this.overrideInput.type = "checkbox";
        this.overrideInput.id = "override-input";

        this.overrideDiv.appendChild(this.overrideLabel);
        this.overrideDiv.appendChild(this.overrideInput);
    }

    private createSubmitDiv(): void {
        this.submitDiv = document.createElement("div");
        this.submitDiv.id = "submit-div";

        this.patchRomButton = document.createElement("button");
        this.patchRomButton.id = "patch-rom-button";
        this.patchRomButton.textContent = "Patch ROM";
        this.patchRomButton.disabled = true;
        this.patchRomButton.hidden = true;

        this.submitDiv.appendChild(this.patchRomButton);
    }

    private createContainerDiv(): void {
        this.div = document.createElement("div");
        this.div.id = "rom-patcher-div";

        this.div.appendChild(this.romSelectorDiv);
        this.div.appendChild(document.createElement("br"));
        this.div.appendChild(this.overrideDiv);
        this.div.appendChild(document.createElement("br"));
        this.div.appendChild(this.submitDiv);
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
        this.romSelectorButton.addEventListener("click", () => {
            this.romSelectorInput.click();
        });
    }

    private addRomInputChangeListener(): void {
        // When the file is selected, change the rom-filename span text to the name of the file
        this.romSelectorInput.addEventListener("change", (event) => {
            const input: HTMLInputElement = event.target as HTMLInputElement;
            const file: File | undefined = input.files?.[0];

            if (file) {
                this.romSelectorFilenameSpan.textContent = file.name;
                this.romSelectorButton.textContent = "Change ROM";
                this.patchRomButton.disabled = false;
                this.patchRomButton.hidden = false;

                document.getElementById("error-div")?.classList.add("hidden");
            }
        });
    }

    private addPatchRomButtonListener(): void {
        this.patchRomButton.addEventListener("click", async () => {
            const file: File | undefined = this.romSelectorInput.files?.[0];

            if (!file) {
                const errorDiv: HTMLDivElement | null = document.getElementById("error-div") as HTMLDivElement | null;
                
                if (errorDiv) {
                    errorDiv.textContent = "Please select a ROM file first.";

                    errorDiv.classList.remove("hidden");
                }

                return;
            }

            const romBytes: ArrayBuffer = await file.arrayBuffer();
            const patcher: Patcher = new Patcher(romBytes);

            const overrideHashCheck: boolean = this.overrideInput.checked;

            if (!overrideHashCheck && !(await patcher.validateRomHash())) {
                const errorDiv: HTMLDivElement | null = document.getElementById("error-div") as HTMLDivElement | null;

                if (errorDiv) {
                    errorDiv.textContent = "The selected ROM file is not a valid Final Fantasy V ROM (Original Japanese or RPGe 1.1).";

                    errorDiv.classList.remove("hidden");
                }

                return;
            }

            if (!(await patcher.checkRomMinimumSize())) {
                const errorDiv: HTMLDivElement | null = document.getElementById("error-div") as HTMLDivElement | null;

                if (errorDiv) {
                    errorDiv.textContent = "The selected ROM file is too small to contain all enemy entries.";

                    errorDiv.classList.remove("hidden");
                }

                return;
            }

            document.getElementById("error-div")?.classList.add("hidden");

            const patchedRomBytes: ArrayBuffer = await patcher.getPatchedRomBytes();
            const blob: Blob = new Blob([patchedRomBytes], { type: "application/octet-stream" });
            const url: string = URL.createObjectURL(blob);
            const a: HTMLAnchorElement = document.createElement("a");

            if (file.name.toLowerCase().endsWith(".smc")) {
                a.download = file.name.replace(/\.smc$/i, "_autohaste.smc");
            }
            else if (file.name.toLowerCase().endsWith(".sfc")) {
                a.download = file.name.replace(/\.sfc$/i, "_autohaste.sfc");
            }
            else {
                a.download = "ffv_autohaste.smc";
            }

            a.href = url;

            a.click();

            URL.revokeObjectURL(url);

            this.romSelectorInput.value = "";
            this.romSelectorFilenameSpan.textContent = "No ROM selected";
            this.romSelectorButton.textContent = "Select ROM";
            this.patchRomButton.disabled = true;
            this.patchRomButton.hidden = true;
        });
    }
}
