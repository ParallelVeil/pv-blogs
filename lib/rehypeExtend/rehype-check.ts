import {visit} from "unist-util-visit";
import {Node, Parent} from "unist";


export function checkAST (option = {}) {
    return (tree:Node) => {
        const visitor = (
            node: Node,
            index: number,
            parent: Parent
        ) => {
            console.log('check', node)
        }
        visit(tree, 'root', visitor)
    }

}