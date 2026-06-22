export class Patcher {
    private readonly romBytes: ArrayBuffer;
    private readonly expectedHashesList: string[] = [
        "c6858d5c02894a6cc71f4dd452c7f288b319d1952ca56fdb185b4bf5e26244a2",  // Japanese version
        "d893dcc82d601887e2b3dd4ab8aa140a0bb032e4afca4721bff645bc7949feb1",  // RPGe English version
        "084a6ce7330677a0d153d95a8cee3c0278ef1617e71e15e02fea289cc79f6461"  // Project Demi version
    ];
    private readonly firstEnemyEntryOffset: number;  // Offset for the first enemy entry in the ROM
    private readonly enemyEntrySize: number;  // Size of each enemy entry in bytes
    private readonly enemyCount: number;  // Total number of enemies in the ROM
    private readonly autoStatusFirstBitmapOffset: number;  // The persistency flag is the the most significant bit here
    private readonly persistencyFlagBitmask: number;  // Bitmask for the status persistency flag
    private readonly autoStatusThirdBitmapOffset: number;  // The haste flag is located here
    private readonly hasteFlagBitmask: number;  // Bitmask for the haste flag

    public constructor(romBytes: ArrayBuffer) {
        this.romBytes = romBytes;
        this.firstEnemyEntryOffset = 0x100000;
        this.enemyEntrySize = 32;
        this.enemyCount = 384;
        this.autoStatusFirstBitmapOffset = 0x1A;
        this.persistencyFlagBitmask = 0x80;
        this.autoStatusThirdBitmapOffset = 0x1C;
        this.hasteFlagBitmask = 0x08;
    }

    public async getPatchedRomBytes(): Promise<ArrayBuffer> {
        await this.patchEnemyStatuses();

        return this.romBytes;
    }

    public async validateRomHash(): Promise<boolean> {
        const romHash: string = await Patcher.calculateSha256Hash(this.romBytes);

        return this.expectedHashesList.includes(romHash);
    }

    private async patchEnemyStatuses(): Promise<void> {
        const romView: DataView = new DataView(this.romBytes);

        for (let i = 0; i < this.enemyCount; i++) {
            const enemyEntryOffset: number = this.firstEnemyEntryOffset + (i * this.enemyEntrySize);

            // Set the persistency flag
            const autoStatusFirstBitmap: number = romView.getUint8(enemyEntryOffset + this.autoStatusFirstBitmapOffset);

            romView.setUint8(enemyEntryOffset + this.autoStatusFirstBitmapOffset, autoStatusFirstBitmap | this.persistencyFlagBitmask);

            // Set the haste flag
            const autoStatusThirdBitmap: number = romView.getUint8(enemyEntryOffset + this.autoStatusThirdBitmapOffset);

            romView.setUint8(enemyEntryOffset + this.autoStatusThirdBitmapOffset, autoStatusThirdBitmap | this.hasteFlagBitmask);
        }
    }

    private static async calculateSha256Hash(bytes: ArrayBuffer): Promise<string> {
        const hashBuffer: ArrayBuffer = await crypto.subtle.digest("SHA-256", bytes);

        return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, "0")).join("");
    }
}
