export default function prettyPrint(tree) {
  prettyPrintHelper(tree[0], 0);
}

function prettyPrintHelper(node, indentation) {
  console.log(getIndentationString(indentation) + node);

  if (node.children.length) {
    node.children.forEach(childNode => {
      prettyPrintHelper(childNode, indentation + 1);
    });
  }
}

function getIndentationString(indentation) {
  let indentationString = '';

  while (indentation > 0) {
    indentationString += '  ';
    indentation--;
  };

  return indentationString;
}
