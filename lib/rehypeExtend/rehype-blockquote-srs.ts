import {Node, Parent} from "unist";
import {visit} from "unist-util-visit";
import {isElement} from "hast-util-is-element";

function rehypeBlockquoteSRS() {
    return (tree: Node) => {
        const visitor = (
            node: Node,
            index: number,
            parent: Parent
        ) => {
            if (!isElement(node, "blockquote")) {
                return
            }
            const blockquote = node;

            const children = blockquote?.children?.reduce((memo: any[], child) => {
                if (child.type !== 'element') {
                    memo.push(child);
                    return memo;
                }

                for (const c of child.children) {
                    if (c.type === 'text') {
                        const QA_REGEX = /([^:]+)::([^#]+)#QA/g;
                        const res = QA_REGEX.exec(c.value)
                        if (res && res.length) {
                            const question = res[1];
                            const answer = res[2];
                            blockquote.properties['dataQuestion'] = question.replace(/^\n|\n$/g, "");
                            blockquote.properties['dataAnswer'] = answer.replace(/^\n|\n$/g, "");
                            blockquote.properties['data-SRS'] = 'QA';
                            c.value = c.value.replace(QA_REGEX, '')
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

export default rehypeBlockquoteSRS;