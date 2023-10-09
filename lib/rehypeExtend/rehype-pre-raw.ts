import {visit} from 'unist-util-visit'
import {Node} from "unist";
import {isElement} from "hast-util-is-element";
import assert from "assert";

export const preProcess = () => (tree: Node) => {
    visit(tree, 'element', (node: Node) => {
        if (isElement(node, 'pre')) {
            const [codeEl] = node.children
            if (!isElement(codeEl, 'code')) return
            // @ts-ignore
            node.raw = codeEl.children?.[0].value
        }
    })
}

export const postProcess = () => (tree: Node) => {
    visit(tree, 'element', (node: Node) => {
        if (isElement(node, 'pre')) {
            // @ts-ignore
            node.properties['raw'] = node.raw
            // console.log(node) here to see if you're getting the raw text
        }
    })
}