function getTextNodes(node) {
  let A = [];
  if (node) {
    //checks if node exists
    node = node.firstChild;
    while (node != null) {
      if (node.nodeType == 3) {
        //checks for if text node

        A[A.length] = node;
      } else {
        A = A.concat(getTextNodes(node));
      }
      node = node.nextSibling; //sets next node
    }
  }
  return A;
}

function getWordCount() {
  let data = getTextNodes(document.body);
  const wordData = new Map();
  let splitString = [];
  for (let i = 0; i < data.length; i++) {
    splitString = data[i].data.split(/\s+/); //get sub string
    for (let j = 0; j < splitString.length; j++) {
      splitString[j] = splitString[j]
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " "); //gets rid of grammar
      if (splitString[j].length > 1) {
        if (wordData.has(splitString[j])) {
          //test if in hash map
          wordData.set(splitString[j], wordData.get(splitString[j]) + 1); //adds 1 if it is
        } else {
          wordData.set(splitString[j], 1); //adds new entry for new word
        }
      }
    }
  }
  console.log(wordData);
  return [wordData, data];
}
function processWordData(wordData) {
  const badWord = [
    "is",
    "Is",
    "Are",
    "are",
    "the",
    "The",
    "Where",
    "where",
    "was",
    "Was",
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "I",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "when",
    "make",
    "can",
    "like",
    "time",
    "no",
    "just",
    "him",
    "know",
    "take",
    "people",
    "into",
    "year",
    "your",
    "good",
    "some",
    "could",
    "them",
    "see",
    "other",
    "than",
    "then",
    "now",
    "look",
    "only",
    "come",
    "its",
    "over",
    "think",
    "also",
    "back",
    "after",
    "use",
    "two",
    "how",
    "our",
    "work",
    "first",
    "well",
    "way",
    "even",
    "new",
    "want",
    "because",
    "any",
    "these",
    "give",
    "day",
    "most",
    "us",
  ];
  let wordArray = [];
  for (let i = 0; i < badWord.length; i++) {
    if (wordData.has(badWord[i])) {
      wordData.delete(badWord[i]); //deletes common word
    }
  }

  wordArray = Array.from(wordData, ([word, count]) => ({ word, count })); //converts map to array

  wordArray.sort(function (a, b) {
    //sort count from least -> greatest
    const keyA = new Date(a.count),
      keyB = new Date(b.count);

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  return wordArray;
}

function replaceWord() {
  let [wordData, nodeData] = getWordCount();
  wordData = processWordData(wordData); //gets sorted array that has been stripped of the proper words

  for (let i = 0; i < nodeData.length; i++) {
    for (let j = 1; j < 25; j++) {
      let re = new RegExp(`\\b${wordData[wordData.length - j].word}\\b`, "gi"); //founds any instances of our word in a string
      if (nodeData[i]) {
        nodeData[i].textContent = nodeData[i].textContent.replace(
          //replaces all instances of the word in a particular string to the count
          re,
          wordData[wordData.length - j].count
        );
      }
    }
  }
}
replaceWord();

function getCommonWords() {
  let commonWord = [];
  const table = document.querySelectorAll("tbody")[0]; //fetches table

  for (let i = 0; i < table.rows.length; i++) {
    commonWord.push(table.rows[i].cells[0].innerText); //gets common word
  }
  console.log(commonWord);
}

getCommonWords();

// async function callApi() {
//   let test;
//   await fetch(
//     "https://www.wikitable2json.com/api/Most_common_words_in_English",
//     {
//       method: "GET",
//       mode: "no-cors",
//     }
//   )
//     .then((res) => res.json())
//     .then(console.log);
// }
// callApi();

// function invade() {
//   var commonWordWindow = window.open(
//     "https://en.wikipedia.org/wiki/Most_common_words_in_English",
//     "testWindow"
//   );
//   var sourceWindow = window.opener;

//   commonWordWindow.test = function () {
//     getCommonWords();
//   };
//   commonWordWindow.onLoad = function () {
//     console.log("hey");
//   };
//   commonWordWindow.test();
//   setTimeout(function () {
//     commonWordWindow.document.body.appendChild(element);
//     console.log("New script appended!");
//   }, 1);
// }

// invade();
