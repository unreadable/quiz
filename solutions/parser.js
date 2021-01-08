// input
const input = `("John", ("Jasmine", ("Jay"), ("Unavailable")), ("Unavailable", ("Jack", ("Jeremy"))), ("Johanna"))`;

// solution
const UNAVAILABLE = 'Unavailable';

class Parser {
    constructor(input, skip) {
        this.tokens = {
            COMMA: ',',
            WP: ' ',
            LP: '(',
            RP: ')',
            QM: '"',
            NIL: '#'
        };
        this.name = input.substring(1, input.indexOf(this.tokens.COMMA));
        this.hierarchy = this.formatInput(input, skip);
        this.parsedHierarchy = [];
    }

    // minimal processing to ease parsing
    formatInput(input, skip) {
        return input.substring(input.indexOf(this.tokens.COMMA), input.length - 1)
            .replace(new RegExp(skip, 'g'), this.tokens.NIL)
            .replace(/\s/g, '');
    }

    // parsing process
    digest() {
        let counter = 0, prevCounter = 0, chunk = '', shouldWrite = true;

        for (let i = 0; i < this.hierarchy.length; i++) {
            const char = this.hierarchy.charAt(i);
            const incomingNil = this.hierarchy.charAt(i + 3) == this.tokens.NIL;
            const recentNil = this.hierarchy.charAt(i - 3) == this.tokens.NIL;

            prevCounter = counter;

            if (char == this.tokens.WP) continue;
            else if (char == this.tokens.LP) counter++;
            else if (char == this.tokens.RP) counter--;
            else if (char == this.tokens.COMMA && incomingNil) shouldWrite = false;

            if (counter < prevCounter) shouldWrite = true;

            if (shouldWrite && !recentNil) chunk += char;

            if (counter === 0) {
                if (chunk.startsWith(this.tokens.LP) && chunk.endsWith(this.tokens.RP)) {
                    this.parsedHierarchy.push(chunk);
                }
                chunk = '';
            }
        }
    }

    // parsed data
    get output() {
        if (this.parsedHierarchy.length === 0) return this.tokens.LP + this.name + this.tokens.RP;
        else return this.tokens.LP + this.name + this.tokens.COMMA + this.parsedHierarchy.join(this.tokens.COMMA) + this.tokens.RP;
    }
}

const p = new Parser(input, UNAVAILABLE);
p.digest();

// output
console.log(p.output.replace(/[,]/g, ', '));
