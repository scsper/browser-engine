import {Node, Text, Element} from './html/dom_types';
import prettyPrint from './html/pretty_print';
import fs from 'fs';
import path from 'path';
import DOMParser from './html/parser';
import CSSParser from './css/parser';

const html = fs.readFileSync(path.resolve(__dirname, '../src/hello_world.html'), 'utf8');
const domParser = new DOMParser(html);
const htmlTree = domParser.parseNodes();

const css = fs.readFileSync(path.resolve(__dirname, '../src/hello_world.css'), 'utf8');
const cssParser = new CSSParser(css);
const stylesheet = cssParser.parseStylesheet();

// const tree = new Node(new Element('div', {'attr': 'attr'}));
// tree.children.push(new Node(new Text('hello')));

// console.log(JSON.stringify(tree, null, 2));

prettyPrint(htmlTree);
console.log(JSON.stringify(stylesheet, null, 2));
