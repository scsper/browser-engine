// @flow
type NodeData = Element | Text;

export class Node {
  data: NodeData;
  children: Node[];

  constructor(data: NodeData, children: Node[]) {
    this.data = data;
    this.children = children || [];
  }

  toString() {
    return this.data.toString();
  }
}

export class Element {
  tag: string;
  attributes: {[id:string]: string};

  constructor(tag: string, attributes: {[id:string]: string}) {
    this.tag = tag;
    this.attributes = attributes;
  }

  toString() {
    return this.tag;
  }
}

export class Text {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  toString() {
    return this.text;
  }
}

export function createElement(tag: string, attributes: {[id: string]: string}, children: Node[]): Node {
  const element = new Element(tag, attributes);

  return new Node(element, children);
}

export function createText(data: string): Node {
  const text = new Text(data);

  return new Node(text, []);
}
