import {createElement, createText} from './dom';
import invariant from '../invariant';

/**
 * Simple HTML parser that allows the following syntax:
 *
 * 1. Balanced tags: <p>...</p>
 * 2. Attributes with quoted values: id="main"
 * 3. Text nodes: <em>world!</em>
 *
 * This is just a toy parser, so there is no real error handling, and we don't handle a lot of functionality.
 */

const ALPHANUMERIC = /[a-zA-Z0-9]/;

// @flow
class Parser {
  position: number;
  input: string;

  constructor(input = '') {
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

  /**
   * Parse a sequence of sibling nodes.
   */
  parseNodes(): Node[] {
    const nodes = [];

    while (true) {
      this.consumeWhitespace();

      if (this.eof() || this.startsWith('</')) {
        break;
      }

      nodes.push(this.parseNode());
    }

    return nodes;
  }

  /**
   * Parse a single node in HTML.
   */
  parseNode(): Node {
    const char = this.peek();
    console.log(char);

    if (char === '<') {
      console.log('parsing element');
      return this.parseElement();
    }

    console.log('parsing text');
    return this.parseText();
  }

  /**
   * Parse a text node in HTML.
   */
  parseText(): Node {
    const text = this.consumeWhile(c => c !== '<');

    return createText(text);
  }

  /**
   * Parse a single element, including its open tag, contents, and closing tag.
   */
  parseElement(): Node {
    invariant(this.consume() === '<', `Expected an opening tag at position ${this.position} of input ${this.input}`);

    console.log(this.position);
    const tagName = this.parseTagName();
    console.log(tagName);
    const attributes = this.parseAttributes();

    invariant(this.consume() === '>', `Expected a closing tag at position ${this.position} of input ${this.input}`);

    const children = this.parseNodes();

    invariant(this.consume() === '<', `Expected an opening tag at position ${this.position} of input ${this.input}`);
    invariant(this.consume() === '/', `Expected a slash at position ${this.position} of input ${this.input}`);

    const parsedTagName = this.parseTagName();
    invariant(parsedTagName === tagName, `Expected parsed tag name [${parsedTagName}] to equal ${tagName}`);
    invariant(this.consume() === '>', `Expected a closing tag at position ${this.position} of input ${this.input}`);

    return createElement(tagName, attributes, children);
  }

  /**
   * Parse a tag or attribute name.
   */
  parseTagName(): string {
    return this.consumeWhile(c => c.match(ALPHANUMERIC));
  }

  /**
   * Parse a list of name="value" pairs, separated by whitespace.
   */
  parseAttributes(): {[id: string]: string} {
    const attributes = {};

    while (true) {
      this.consumeWhitespace();

      if (this.peek() == '>') {
        break;
      }

      const {name, value} = this.parseAttribute();

      attributes[name] = value;
    }

    return attributes;
  }

  /**
   * Parse a single name="value" pair.
   */
  parseAttribute(): {[id: string]: string} {
    const name = this.parseTagName();

    invariant(this.consume() === '=', `Expected an = after an attribute name`);

    const value = this.parseAttributeValue();

    return {name, value};
  }

  /**
   * Parse a quoted value
   */
  parseAttributeValue(): String {
    invariant(this.consume() === '"', `Expected attribute value to start with '"'`);

    const value = this.consumeWhile( c => c!== '"');

    invariant(this.consume() === '"', `Expected attribute value to end with '"'`);

    return value;
  }
}

/**
 * Parse an HTML document and return the root element.
 */
export function parse(source : String) : Node {
  const parser = new Parser(source);

  return parser.parseNodes();
}
