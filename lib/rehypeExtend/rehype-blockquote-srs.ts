import {Node, Parent} from "unist";
import {visit} from "unist-util-visit";
import {isElement} from "hast-util-is-element";

function rehypeBlockquoteSRS ()  {
    return (tree:Node) => {
        const visitor = (
            node: Node,
            index: number,
            parent: Parent
        ) => {
            if (!isElement(node, "blockquote")) {
                return
            }
            const blockquote = node;
            console.dir(JSON.stringify(blockquote.children))
        }
        visit(tree, 'element', visitor)
    }
}

export default rehypeBlockquoteSRS;