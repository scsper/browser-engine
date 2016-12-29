// @flow
import {Stylesheet, Rule, Declaration, SimpleSelector} from './parser_types';
import invariant from '../invariant';
import Parser from '../parser';

const ALPHANUMERIC = /[a-zA-Z0-9]/;

class CSSParser extends Parser {
  constructor(input: string) {
    super(input);
  }

  /**
   * Parse the stylesheet.
   */
  parseStylesheet(): Stylesheet {
    const stylesheet = new Stylesheet();

    while (!this.eof()) {
      const rule = this.parseRule();

      stylesheet.addRule(rule);

      // there could be a new line or trailing whitespace after rules
      this.consumeWhitespace();
    }

    return stylesheet;
  }

  /**
   * Parse individual rules in the stylesheet.
   *
   * A rule consists of a selector and a declaration.
   * Example: div.note { margin: 4px }
   */
  parseRule(): Rule {
    return new Rule(this.parseSelectors(), this.parseDeclarations());
  }

  /**
   * Gets all selectors in a given rule.
   *
   * If a rule is h1, h2, h3 { margin: 0},
   * then this function would return an array of SimpleSelectors
   * with the following tags: [h1, h2, h3]
   */
  parseSelectors(): SimpleSelector[] {
    const selectors = [];
    let isDeclarationFound = false;

    this.consumeWhitespace();

    while (!isDeclarationFound) {
      const selector = this.parseSimpleSelector();

      selectors.push(selector);

      switch (this.peek()) {
        case ',':
          this.consume();
          this.consumeWhitespace();
          break;
        case '{':
          isDeclarationFound = true;
          break;
        default:
          throw new Error('Unexpected character in selector list: ' + this.peek());
      }
    }

    // TODO: Address specificity.
    return selectors;
  }

  /**
   * Parse a selector.  Supports classes, ids, and tags only.
   */
  parseSimpleSelector(): SimpleSelector {
    const selector = new SimpleSelector();
    let foundInvalidChar = false;

    while (!this.eof() && !foundInvalidChar) {
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
          // universal selector
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

  parseDeclarations() {
    const declarations = [];
    let isDeclarationDone = false;

    invariant(this.consume() === '{', 'A declaration is required to start with a {');

    while (!isDeclarationDone) {
      this.consumeWhitespace();

      switch (this.peek()) {
        case ';':
          this.consume();
          break;
        case '}':
          this.consume();
          isDeclarationDone = true;
          break;
        default:
          const declaration = this.parseDeclaration();
          declarations.push(declaration);
          this.consumeWhitespace();
      }
    }

    return declarations;
  }

  parseDeclaration() {
    const name = this.consumeWhile(c => c !== ':');

    this.consume(); // consume the colon that separates the name from the value.

    const value = this.consumeWhile(c => c !== ';');

    return new Declaration(name, value);
  }

  parseIdentifier(): string {
    this.consumeWhitespace();

    return this.consumeWhile(c => c !== ',' && c !== '{');
  }

  isValidIdentifierChar(c: string): boolean {
    return c.match(ALPHANUMERIC);
  }
}

export default CSSParser;
