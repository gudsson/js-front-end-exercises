1. Write some JavaScript code to retrieve a word count for each `h2` heading on the page.

  ```js
  let h2List = document.querySelectorAll('h2');
  let h2Array = Array.from(h2List);
  console.log(h2Array.map(element => element.textContent.split(' ').length));
  ```

   

2. The page has a table of contents with the title "Contents" and links to the different content sections on "Naming and etymology," "Taxonomy and evolution," etc.

  Use three different DOM methods to retrieve a reference to the div element that contains the table of contents.

   ```js
   document.querySelector('#toc'); 
   ```

   ```js
   document.getElementById('toc'); 
   ```

   ```js
   document.querySelector('.toc'); 
   ```
   

3. Write some JavaScript code to change the color for every odd indexed link in the table of contents to green.

   ```js
  let toc = document.getElementById('toc');
  let tocLinks = toc.querySelectorAll('a');
  let tocArr = Array.from(tocLinks);

  tocArr.forEach((link, idx) => {
    if (idx % 2 === 0) link.style.color = 'green';
  });
   ```

   

4. Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

  ```js
  let thumbCaptionDivs = Array.from(document.querySelectorAll('.thumbcaption'));
  let thumbCaptions = thumbCaptionDivs.map(div => div.textContent.trim());

  console.log(thumbCaptions);
  ```


5. You can think of the scientific classification of an animal as a series of key-value pairs. Here, the keys are taxonomic ranks (Domain, Kingdom, Phylum, etc.). The values are the specific groups to which the animal belongs.

  Write JavaScript code that extracts the classification of animals from the web page and logs an Object that uses the ranks as keys and the groups as values. You may assume the taxonomic ranks to use as keys is provided for you as an array.

  ```js
  let keys = ['Kingdom', 'Phylum', 'Clade', 'Class', 'Order', 'Suborder', 'Family',
            'Genus', 'Species'];
  let classObj = {};
  let tdList = document.querySelectorAll('.infobox td');

  let cell;
  let link;

  for (index = 0; index < tdList.length; index += 1) {
    cell = tds[index];

    keys.forEach(key => {
      if (cell.textContent.indexOf(key) !== -1) {
        classification[key] = cell.nextElementSibling.firstElementChild.textContent;
      }
    });
  }
  ```
