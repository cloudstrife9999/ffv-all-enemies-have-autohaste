export class WelcomeDiv {
    private readonly div: HTMLDivElement;
    private readonly welcomeMessage: HTMLHeadingElement;

    constructor() {
        this.div = document.createElement("div");

        this.div.id = "welcome-div";

        this.welcomeMessage = document.createElement("h1");
        this.welcomeMessage.textContent = "A simple web-based tool to give permanent auto-haste to all enemies in Final Fantasy V";

        this.div.appendChild(this.welcomeMessage);
    }

    public getDiv(): HTMLDivElement {
        return this.div;
    }
}
