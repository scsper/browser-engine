// @flow
type NodeData = Element | Text;

class Node {
  data: NodeData;
  children: Node[];

  constructor(data) {
    this.data = data;
    this.children = [];
  }
}

class Element {
  tag: string;
  attributes: {[id:string]: string};

  constructor(tag, attributes) {
    this.tag = tag;
    this.attributes = attributes;
  }
}

class Text {
  text: string;

  constructor(text) {
    this.text = text;
  }
}