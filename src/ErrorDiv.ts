export class ErrorDiv {
    private readonly div: HTMLDivElement;
    private readonly messageSpan: HTMLSpanElement;

    public constructor(errorMessage?: string) {
        this.div = document.createElement("div");

        this.div.id = "error-div";

        this.div.classList.add("hidden");

        this.messageSpan = document.createElement("span");

        this.messageSpan.id = "error-message";
        this.messageSpan.textContent = errorMessage || "";

        this.div.appendChild(this.messageSpan);

        this.addHideOnClickListener();
    }

    public getDiv(): HTMLDivElement {
        return this.div;
    }

    public showError(message: string): void {
        this.messageSpan.textContent = message;

        this.div.classList.remove("hidden");
    }

    private addHideOnClickListener(): void {
        this.div.addEventListener("click", () => {
            this.div.classList.add("hidden");

            this.messageSpan.textContent = "";
        });
    }
}
