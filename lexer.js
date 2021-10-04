
var EOF = -1;

function lexer(input) {
	this.input = input;
	this.c = input[0];
	this.p = 0;
}

lexer.prototype.tokenize = function () {
	var tokens = [];	

	for (var t = this.nextToken(); t !== EOF; t = this.nextToken()) {
		tokens.push(t)
	}

	return tokens;
}

lexer.prototype.nextToken = function () {
	while (this.c !== EOF) {
		if (/\s/.test(this.c)) {
			this.consume(); continue;
		} else if (['(', ')', '+', '/', ',', '='].indexOf(this.c) > -1) {
			return this.symbol();
		} else if (this.c === '*') {
			this.consume();
			if (this.c === '*') {
				this.consume();
				return '**';
			} else {
				return '*';
			}
		} else if (this.c === '-') {
			if (this.isNumber(this.input[this.p + 1])) {
				// this is a negative number
				return this.number();
			} else {
				return '-';
			}
		} else if (this.isNumber(this.c)) {
			return this.number();
		} else if (this.isCharacter(this.c)) {
			return this.functionOrVariableName();
		} else {
			throw 'Illegal: ' + this.c;
		}
	}

	return EOF;
}

lexer.prototype.isCharacter = function (c) {
	return /^[a-z]$/.test(c);
}

lexer.prototype.isNumber = function (d) {
	return /^[0-9.]$/.test(d);
}

lexer.prototype.symbol = function () {
	let c = this.c;
	this.consume();
	return c;
}

lexer.prototype.number = function () {
	let result = [];
	// allow negatives at the front only
	if (this.c === '-') {
		result.push('-');
		this.consume();
	}

	do {
		result.push(this.c);
		this.consume();
	} while (this.c === '.' || this.isNumber(this.c));

	var numStr = result.join('');
	if (/^.*\..*\..*$/.test(numStr)) {
		throw 'Invalid number: ' + numStr;
	}
	return numStr;
}

lexer.prototype.functionOrVariableName = function () {
	let result = [];
	do {
		result.push(this.c);
		this.consume();
	} while (this.isCharacter(this.c));

	return result.join('');
}

lexer.prototype.consume = function () {
	this.p++;
	if (this.p < this.input.length) { this.c = this.input[this.p]; }
	else { this.c = EOF; }
}

module.exports = lexer;