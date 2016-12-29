// @flow
export default class Parser {
  position: number;
  input: string;

  constructor(input: string) {
    this.position = 0;
    this.input = input;
  }

  /**
   * Returns the current character in the input without advancing the position pointer.
   */
  peek(): string {
    return this.input[this.position];
  }

  /**
   * Returns TRUE if all input is consumed.
   */
  eof(): boolean {
    return this.position >= this.input.length;
  }

  /**
   * Answers the question "Do the next characters start with the given string?"
   */
  startsWith(s: string): boolean {
    return this.input.startsWith(s, this.position);
  }

  /**
   * Return the current character and advance the pointer to the next character.
   */
  consume(): string {
    // order of operations is my friend here.
    return this.input[this.position++];
  }

  /**
   * Consumes characters that meet a given condition and returns them as a string.
   * The argument is a function that takes a single character and returns a boolean.
   */

  // TODO: figure out the proper way to define a function as parameter in flow.
  consumeWhile(test: any): string {
    let consumedCharacters = '';

    while (!this.eof() && test(this.peek())) {
      consumedCharacters += this.consume();
    }

    return consumedCharacters;
  }

  /**
   * Consumes all whitespace starting at the current position
   */
  consumeWhitespace(): void {
    this.consumeWhile(c => !Boolean(c.trim().length));
  }

  toString() {
    return this.input.slice(this.position);
  }
}
