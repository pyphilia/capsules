// Define a serializing function that takes a value and returns a string.
export const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  );
};

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string) => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};

export const load = () => {
  if (localStorage.getItem('content')) {
    return JSON.parse(localStorage.getItem('content'));
  }

  return [
    {
      id: 'myidfordnd',
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];
};

export const save = (editor, value) => {
  const isAstChange = editor.operations.some(
    (op) => 'set_selection' !== op.type,
  );
  console.log(value);
  //   if (isAstChange) {
  // Serialize the value and save the string value to Local Storage.
  // localStorage.setItem('content', JSON.stringify(value));
  //   }
};
