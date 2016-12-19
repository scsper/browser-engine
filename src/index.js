import {Node, Text, Element} from './html/dom';
import prettyPrint from './html/pretty_print';

const tree = new Node(new Element('div', {'attr': 'attr'}));
tree.children.push(new Node(new Text('hello')));

prettyPrint(tree);
