
const readline = require("readline"),
lexer = require("./lexer"),
parser = require("./parser");


const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

const debug = (process.argv.slice(2).indexOf('-debug') > -1);
const env = {}; // values to be held

rl.on('line', function (line) {
try {
    let tokens = new lexer(line.trim()).tokenize();
    if (debug) {
        console.log("=> ", new parser(tokens, env).parse());
    }
    console.log("=> ", parser.evaluate(tokens, env));
} catch (e) {
    console.log("Error:", e);
}
rl.prompt();
}).on('SIGINT', function () {
    rl.question('Exit (y or n)? ', (input) => {
        if (input.match(/^y(es)?$/i)) { rl.close(); }
      });
}).on('close', function () {
    console.log("Thank you for the tasty numbers")
process.exit(0);
});

