// @flow
type NodeData = Element | Text;

export class Node {
  data: NodeData;
  children: Node[];

  constructor(data: NodeData) {
    this.data = data;
    this.children = [];
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
