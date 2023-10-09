import {visit} from 'unist-util-visit'
import {Node,Parent} from "unist";
import {isElement} from "hast-util-is-element";

export default function rehypeBlockquote() {
    return function transformer(tree: Node) {
        const visitor = (
            node: Node,
            index: number,
            parent: Parent
        ) => {
            // If it's not a blockquote, do nothing
            if (!parent || !isElement(node, "blockquote")) {
                return
            }
            const blockquote = node;

            const children = blockquote?.children?.reduce((memo: any, child: any) => {
                if (child.type !== 'element') {
                    memo.push(child);
                    return memo;
                }

                for (const c of child.children) {
                    if (c.type === 'text') {
                        const res = /^([^\:]+)\:"([^"]+)/gi.exec(c.value);

                        if (res && res.length) {
                            const color = res[1];
                            const title = res[2];

                            blockquote.properties['dataBqColor'] = color;
                            blockquote.properties['dataBqTitle'] = title;
                            c.value = c.value.replace(/^([^\:]+)\:"([^"]+)"\s/gi, '')
                        }
                    }

                    memo.push(c);
                }

                return memo;
            }, []);


            blockquote.children = children;
        }

        visit(tree, 'element', visitor)
    }
}
