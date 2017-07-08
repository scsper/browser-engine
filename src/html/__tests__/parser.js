import DOMParser from '../parser';

describe('html parser', function() {
  describe('basic functionality', function() {
    it('parses a balanced tag', function() {
      const domParser = new DOMParser('<p>Hello</p>');
      const htmlTree = domParser.parseNodes();
      const expectedTree = [
        {
          data: {
            tag: 'p',
            attributes: {}
          },
          children: [
            {
              data: {
                text: 'Hello'
              },
              children: []
            }
          ]
        }
      ];

      expect(htmlTree).toEqual(expectedTree);
    });

    it('parses attributes with quoted values', function() {
      const domParser = new DOMParser('<p id="main">Hello</p>');
      const htmlTree = domParser.parseNodes();
      const expectedTree = [
        {
          data: {
            tag: 'p',
            attributes: {
              id: 'main'
            }
          },
          children: [
            {
              data: {
                text: 'Hello'
              },
              children: []
            }
          ]
        }
      ];

      expect(htmlTree).toEqual(expectedTree);
    });

    it('handles nested html with classes', function() {
      const html = `<html>
        <body>
          <h1>Title</h1>
          <div id="main" class="test">
            <p>Hello <em>world</em>!</p>
          </div>
        </body>
      </html>`;
      const domParser = new DOMParser(html);
      const htmlTree = domParser.parseNodes();
      const expectedTree = [
        {
          data: {
            tag: 'html',
            attributes: {}
          },
          children: [
            {
              data: {
                tag: 'body',
                attributes: {}
              },
              children: [
                {
                  data: {
                    tag: 'h1',
                    attributes: {}
                  },
                  children: [
                    {
                      data: {
                        text: 'Title'
                      },
                      children: []
                    }
                  ]
                },
                {
                  data: {
                    tag: 'div',
                    attributes: {
                      id: 'main',
                      class: 'test'
                    }
                  },
                  children: [
                    {
                      data: {
                        tag: 'p',
                        attributes: {}
                      },
                      children: [
                        {
                          data: {
                            text: 'Hello '
                          },
                          children: []
                        },
                        {
                          data: {
                            tag: 'em',
                            attributes: {}
                          },
                          children: [
                            {
                              data: {
                                text: 'world'
                              },
                              children: []
                            }
                          ]
                        },
                        {
                          data: {
                            text: '!'
                          },
                          children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];

      expect(htmlTree).toEqual(expectedTree);
    });
  });
});
