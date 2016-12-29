// @flow
import invariant from '../invariant';

type Selector = SimpleSelector;
type Value = Keyword | Length | Color;
type Keyword = string;

export class Stylesheet {
  rules: Rule[];

  constructor() {
    this.rules = [];
  }

  addRule(rule: Rule) {
    this.rules.push(rule);
  }

  toString(): string {
    return this.rules.map(rule => rule.toString()).join(', ');
  }
}

export class Rule {
  selectors: Selector[];
  declarations: Declaration[];

  constructor(selectors: Selector[], declarations: Declaration[]) {
    this.selectors = selectors;
    this.declarations = declarations;
  }

  toString(): string {
    return `selectors: ${this.selectors.join(', ')}\ndeclarations: ${this.declarations.join(', ')}`;
  }
}

export class SimpleSelector {
  tagName: string;
  id: string;
  classes: string[];

  constructor(tagName: string, id: string, classes: string[]) {
    this.tagName = tagName || '';
    this.id = id || '';
    this.classes = classes || [];
  }

  toString(): string {
    return `tagName: ${this.tagName} id: ${this.id} classes: ${this.classes.join(', ')}`;
  }
}

export class Declaration {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  toString(): string {
    return `${this.name}:${this.value}`;
  }
}

export class Length {
  value: number;
  unit: string;

  constructor(value: number, unit: string) {
    this.value = value;
    this.unit = unit;
  }
}

export class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}
