# bmjs-fcpxml
A utility for generating FCP XML files from predefined data. Reads source files from and writes output to directory named "assets".
```javascript
const fcp = require('bmjs-fcpxml');
```
Generate XML, audio and upload metadata from a slides object and optional project name:
```javascript
fcp.init();
let slides = [
  {
    title: 'My video',
    description: 'A test description.',
    category: '22',
    keywords: ['html','css','javascript'],
    privacy: 'public',
    clips: [
      {
        text: 'Some text...',
        audio: '',
        image: '',
        keyword: '',
        template: ''
      },
      {
        text: 'Some more text...',
        audio: '',
        image: {filename: 'sample-img.png'},
        keyword: 'dog',
        template: ''
      },
      {
        text: 'A third line of text.',
        audio: '',
        image: '',
        keyword: '',
        template: ''
      }
    ]
  },
];
fcp.xml(slides,'My Project');
fcp.write();
```
