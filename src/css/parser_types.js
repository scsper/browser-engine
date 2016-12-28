// @flow
type Selector = SimpleSelector;
type Value = Keyword | Length | Color;
type Keyword = string;

class Stylesheet {
  rules: Rule[];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }
}

class Rule {
  selectors: Selector[];
  declarations: Declaration[];

  constructor(selectors: Selector[], declarations: Declaration[]) {
    this.selectors = [];
    this.declarations = [];
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
}

class Declaration {
  name: string;
  value: Value;

  constructor(name: string, value: Value) {
    this.name = name;
    this.value = value;
  }
}

class Length {
  value: number;
  unit: string;

  constructor(value: number, unit: string) {
    this.value = value;
    this.unit = unit;
  }
}

class Color {
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
