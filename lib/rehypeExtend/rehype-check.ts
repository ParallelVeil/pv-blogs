import {Node} from "unist";
import {visit} from "unist-util-visit";


export function checkAST(option = {}) {
    return (tree: Node) => {
        visit(tree, 'root', (node) => {
            console.log(tree)
        });
    };
}