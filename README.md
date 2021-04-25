# td.js
td.js is an open source and free timing diagram renderer that is based on html/css and javascript.

## Usage / example
```js
// Import td.js and td.css before

obj = {
  signals: [
    {
      name: 'Clock name',
      type: 'clock',
      unit: 1
    },
    {
      name: 'Signal name',
      type: 'data',
      unit: 0.5,
      data: 'd2d4d1zd2hlh2l2d2l2h2d2h4l2d2x2hzlzh',
      labels: [
          'AAAA',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G'
      ]
    }
  ]
};
let tgt = document.querySelector('#draw-container');
TdRender(tgt, obj);
```

|Data symbol|Name|
|-|-|
|d|data|
|h|1|
|l|0|
|x|Don't care|
|z|Hi-z|

![image](https://user-images.githubusercontent.com/17945273/115991360-e52cdc80-a602-11eb-82a0-4c37c3514ca3.png)

## Web example

Refer to the example page: [jsfiddle](https://jsfiddle.net/e4sz81g5/3/)
