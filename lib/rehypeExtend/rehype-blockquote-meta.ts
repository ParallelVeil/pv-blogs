import {visit} from 'unist-util-visit'
import {Node} from "unist";

export default function rehypeBlockquote() {
    return function transformer(tree: Node) {
        const visitor = (
            node: any,
            index: number,
            parent: any
        ) => {
            // If it's not a blockquote, do nothing
            if (!parent || node.tagName !== 'blockquote') {
                return
            }
            const blockquote = node;
            console.log('blockquote', blockquote)

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
