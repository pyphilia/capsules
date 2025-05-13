// Define a React component renderer for our code blocks.
export const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      This is a code
      <code>{props.children}</code>
    </pre>
  );
};
