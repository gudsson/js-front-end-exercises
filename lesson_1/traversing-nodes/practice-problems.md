1. Starting with the `document` node, use the `lastChild` and `childNodes` properties to change the text color to red on the `On the River` heading and set its font size 48 pixels.

   ```js
   let html = document.childNodes[1];
   let body = html.lastChild;
   let heading = body.childNodes[1];
   heading.style.color = 'red';
   heading.style.fontSize = '48px';
   ```

   

2. Count the paragraphs on the page, and then log the result.

   ```js
   let count = 0;
   
   walk(document, node => {
     if (node.nodeName === 'P') {
       count++;
     }
   });
   
   console.log(count);   
   ```

   

3. Retrieve the first word from each paragraph on the page and log the entire list.

   ```js
   let words = [];
   
   walk(document, node => {
     if (node.nodeName === 'P') {
       let text = node.firstChild.data.trim();
       let firstWord = text.split(' ')[0];
       words.push(firstWord);
     }
   });
   
   console.log(words);
   ```

   

4. 

