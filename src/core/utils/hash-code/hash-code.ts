
export class HashCode {
    constructor() { }

    private hashCode(str: string): number {
        let h = 0;
        const len = str.length;
        const t = 2147483648;
        for (let i = 0; i < len; i++) {
            h = 31 * h + str.charCodeAt(i);
            if (h > 2147483647) {
                h %= t;
            }
        }
        return h;
    }

    private randomWord(randomFlag: boolean, min: number, max?: number): string {
        let str = "";
        let range = min;
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }

        for (let i = 0; i < range; i++) {
            const pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }

    public getHashCode() {
        var timestamp = (new Date()).valueOf();
        var myRandom = this.randomWord(false, 6);
        var hashcode = this.hashCode(myRandom + timestamp.toString());
        return hashcode;
    }
}