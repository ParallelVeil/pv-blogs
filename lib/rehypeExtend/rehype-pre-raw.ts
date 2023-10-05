import { visit } from 'unist-util-visit'
import {Node} from "unist";
export const preProcess = () => (tree:Node) => {
    visit(tree, (node:any) => {
        if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children

            if (codeEl.tagName !== 'code') return

            node.raw = codeEl.children?.[0].value
        }
    })
}

export const postProcess = () => (tree:Node) => {
    visit(tree, 'element', (node:any) => {
        if (node?.type === 'element' && node?.tagName === 'pre') {
            node.properties['raw'] = node.raw
            // console.log(node) here to see if you're getting the raw text
        }
    })
}