
type Props = {
    className?: string;
    children?: React.ReactNode;
};
const CodeBlock: React.FC<Props> = ({ className, children = "" }: Props) => {
    console.log(className,children)
    return (
        <>
            {children}
        </>
    );
};

export default CodeBlock;