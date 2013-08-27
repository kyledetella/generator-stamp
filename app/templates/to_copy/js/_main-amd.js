'use strict';

//
// Initialize your app!
// 
define(['jst'], function (JST) {
  console.log('------------------------\n');
  if (JST) console.log(JST);
  console.log('You\'ve just Stamped out <%= _.slugify(projectTitle) %>!');
  console.log('\n------------------------');
});
