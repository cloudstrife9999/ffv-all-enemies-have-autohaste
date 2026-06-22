export class ErrorDiv {
    private readonly div: HTMLDivElement;
    private readonly messageSpan: HTMLSpanElement;

    public constructor(errorMessage?: string) {
        this.div = document.createElement("div");

        this.div.id = "error-div";
        this.div.hidden = true;

        this.messageSpan = document.createElement("span");

        this.messageSpan.id = "error-message";
        this.messageSpan.textContent = errorMessage || "";

        this.div.appendChild(this.messageSpan);

        this.addHideOnClickOutsideListener();
    }

    public getDiv(): HTMLDivElement {
        return this.div;
    }

    public showError(message: string): void {
        this.messageSpan.textContent = message;

        this.div.hidden = false;
    }

    private addHideOnClickOutsideListener(): void {
        document.addEventListener("click", (event: MouseEvent) => {
            if (!this.div.contains(event.target as Node)) {
                this.div.hidden = true;
                this.messageSpan.textContent = "";
            }
        });
    }
}
