const prefix = 'addons.basicComponents.components.text.settings';

export default {
  title: t => t(prefix + '.title', 'Text settings'),
  fields: [{
    type: 'textarea',
    key: 'content',
    default: '',
    label: t => t(prefix + '.content.title', 'Content'),
  }],
};
