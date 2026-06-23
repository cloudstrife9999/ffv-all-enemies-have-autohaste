export class InfoDiv {
    private readonly div: HTMLDivElement;
    private readonly messageSpan: HTMLSpanElement;
    private readonly link: HTMLAnchorElement;

    public constructor() {
        this.div = document.createElement("div");

        this.div.id = "info-div";

        this.messageSpan = document.createElement("span");

        this.messageSpan.id = "info-message";
        this.messageSpan.textContent = "Source code and README available on ";

        this.link = document.createElement("a");
        this.link.id = "info-link";
        this.link.href = "https://github.com/cloudstrife9999/ffv-all-enemies-have-autohaste/";
        this.link.textContent = "GitHub";

        this.div.appendChild(this.messageSpan);
        this.div.appendChild(this.link);
    }

    public getDiv(): HTMLDivElement {
        return this.div;
    }
}
