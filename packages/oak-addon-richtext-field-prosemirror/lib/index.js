import Editor from './core/Editor';

export default {
  fieldTypes: [{
    type: 'richtext',
    default: [],
    render: (baseProps, customProps) => (
      <Editor { ...customProps } { ...baseProps } />
    ),
  }],
};