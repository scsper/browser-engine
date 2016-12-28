// @flow
import {SimpleSelector} from './parser_types';
import invariant from '../invariant';
import Parser from '../parser';

const ALPHANUMERIC = /[a-zA-Z0-9]/;

class CSSParser extends Parser {
  constructor(input: string) {
    super(input);
  }

  parseSimpleSelector(): SimpleSelector {
    const selector = new SimpleSelector();
    let foundInvalidChar = false;

    while (!this.eof() && !foundInvalidChar){
      switch (this.peek()) {
        case '#':
          this.consume();
          selector.id = this.parseIdentifier();
          break;
        case '.':
          this.consume();
          selector.classes.push(this.parseIdentifier());
          break;
        case '*':
          //universal selector
          this.consume();
          break;
        default :
          if (this.isValidIdentifierChar(this.peek())) {
            selector.tagName = this.parseIdentifier();
          } else {
            foundInvalidChar = true;
            break;
          }
      }
    }

    return selector;
  }

  parseIdentifier(): string {
    this.consumeWhitespace();

    return this.consumeWhile(c => c !== ',' || c!== '{' || c!== ' ');
  }

  isValidIdentifierChar(c: string): boolean {
    return c.match(ALPHANUMERIC);
  }

}
