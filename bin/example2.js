const screen = require('blessed').screen();

const tree = require('blessed-contrib').tree();
tree.setData({
  extended: true,
  children: {
    'Fruit': {
      children: {
        'Banana': {},
        'Apple': {},
        'Cherry': {},
        'Exotics': {
          children: {
            'Mango': {},
            'Papaya': {},
            'Kiwi': {
              name: 'Kiwi(notthebird!)',
              myCustomProperty: "hairyfruit"
            }
          }
        },
        'Pear': {}
      }
    },
    'Vegetables': {
      children: {
        'Peas': {},
        'Lettuce': {},
        'Pepper': {}
      }
    }
  }
});
tree.focus();

screen.append(tree);

screen.render();
