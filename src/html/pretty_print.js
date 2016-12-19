export default function prettyPrint(tree) {
  prettyPrintHelper(tree, 0);
}

function prettyPrintHelper(tree, indentation) {
  console.log(getIndentationString(indentation) + tree);

  if (tree.children.length) {
    tree.children.forEach(node => {
      prettyPrintHelper(node, indentation + 1);
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