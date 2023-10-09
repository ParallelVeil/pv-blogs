import {visit} from "unist-util-visit";
import {Plugin} from "unified";
import {Node, Parent} from "unist";


export const checkAST: Plugin = (option = {}) => {
    return (tree) => {
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