import {Node, Text, Element} from './html/dom';
import prettyPrint from './html/pretty_print';
import fs from 'fs';
import path from 'path';
import {parse} from './html/parser';

const html = fs.readFileSync(path.resolve(__dirname, '../src/hello_world.html'), 'utf8');
const tree = parse(html);

// const tree = new Node(new Element('div', {'attr': 'attr'}));
// tree.children.push(new Node(new Text('hello')));

prettyPrint(tree);
