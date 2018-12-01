# Class 2
* homework solutions
* practice with common higher order functions
* what happens when we load a web page

## homework solutions

First, some setup, let's make sure we can all do the following:
* make a new project in github
* pull down my latest changes from github
* copy them over without screwing up git
* setup an npm project
* create a nice dev flow with browser-sync

#### priorities can become negative

Modify the code to prevent that from happening

Solution:
```
function makeHigherPriority(name) {
  var priority = priorities.find(p => p.name === name)
  if (priority.level > 1) {
    priority.level = priority.level - 1
  }

  drawPriorities()
}
```

Or better, UX Change:

The trick I use to disable the button, is, as always, found in the docs. I had
to look at the docs right before writing the below, I don't have things
memorized: [bootstap button docs](https://getbootstrap.com/docs/4.1/components/buttons/#disabled-state)

```
function drawPriorities() {
  var list = document.getElementById("priority-list")
  var currentPriorities = priorities
    .sort((x,y) => x.level - y.level)
    .map(x => {
      var disabledHigher = x.level === 1 ? 'disabled': ''
      var disabledLower = x.level === priorities.length ? 'disabled': ''
      return `<li class="list-group-item">
      <span class="badge badge-primary badge-pill"> ${x.level} </span>
      <span>${x.name}</span>
      <span class="float-buttons">
        <button ${disabledHigher} onclick="return makeHigherPriority('${x.name}')" type="button" class="btn btn-sm btn-outline-primary">Make Higher Priority</button>
        <button ${disabledLower} onclick="return makeLowerPriority('${x.name}')" type="button" class="btn btn-sm btn-outline-secondary">Make Lower Priority</button>
      </span>
      </li>`
    })
    .join("")
  list.innerHTML = currentPriorities
}
```


#### make lower priority does string concatenation instead of addition

Solution:

```
function priorityLevelChange(event){
  currentPriorityLevel = Number(event.target.value)
}
```

#### priorities can go lower in priority indefinitely 

Modify the code to have the lowest priority not go any higher (i.e, if you have
5 priorities, the lowest priority would have the number 5, and should not be
able to go to 6 or 7)

solution: ux solution above for negative levels covers this bug as well

## the homework
Change the UI to not take the priority level as a parameter. When one adds a new
priority, you should just give that new item the next available priority level.

Now, when the user clicks the Make Higher Priority and Make Lower Priority
buttons, they should shift the surrounding priorities appropriately. This means
if I have three items, and I make item #2 lower priority, item #3 should become
item #2 in terms of priority

Refactor the code to accomplish the above.

Solution:

```
function addNewPriority(event){
  var nextPriorityLevel = priorities.length + 1
  priorities.push({name: currentPriority, level: nextPriorityLevel})
  drawPriorities()
  return false;
}

function priorityChange(event){
  currentPriority = event.target.value
}

function makeHigherPriority(name) {
  var priority = priorities.find(p => p.name === name)
  var currentLevel = priority.level
  var siblingPriority = priorities.find(p => p.level === currentLevel - 1)
  siblingPriority.level = currentLevel
  if (priority.level > 1) {
    priority.level = priority.level - 1
  }

  drawPriorities()
}

function makeLowerPriority(name) {
  var priority = priorities.find(p => p.name === name)
  var currentLevel = priority.level
  var siblingPriority = priorities.find(p => p.level === currentLevel + 1)
  siblingPriority.level = currentLevel
  priority.level = priority.level + 1

  drawPriorities()
}
```

## Practice with common higher order functions

First a little bit of some newer style javascript:
* rocket function (arrow)
* ternary operator - a better if, one that gives back!

#### map

* add two to each number in a list of numbers
* mark items as complete in a data model holding to do list items
#### filter
* filter to only even numbers in a list of numbers
* filter to only people that are 21 or older in a list of people
#### reduce
* find the sum of a list of numbers

#### all three
* find the sum of the ages of all people over 21 in a list of people

## Homework

#### more practice with higher order functions

Here is what we covered in class:

* [map docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [filter docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```
var mapPractice = [1, 2, 3]
function callback(e) {
 return e + 1
}
var newArray = mapPractice.map(callback)
console.log(newArray)

var mapPractice = ["zach", "bob", "susan", "carson", "stanley"]
function callback(e) {
 return "hello " + e
}
var newArray = mapPractice.map(callback)
console.log(newArray)

var mapPractice = [{name: "zach"} , {name: "bob"}, {name: "susan"}]
function callback(e) {
 return "hello " + e.name
}
var newArray = mapPractice.map(callback)
console.log(newArray)

var filterPractice = [{name: "zach"} , {name: "bob"}, {name: "susan"}]
function callback(e) {
  return !(e.name === "bob")
}
var newArray = filterPractice.filter(callback)
console.log(newArray)
```

Below I have some callback functions I'd like you to fill in:

[reduce docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```
var reducePractice = [1, 2, 3, 4, 5]
function reduceCallback(acc, e) {
  // our goal is to get the sum of all the numbers
  return ???
}

var answer = reducePractice.reduce(reduceCallback)
console.log(answer)
// should be 15
```

combinding them all together, below you need to implement three callback
functions - our goal is to get the sum of the ages of all people over 21

don't worry about my switch to the [arrow](https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc) function below

```
var allThreePractice = [{name: "zach", age: 28} , {name: "bob", age: 14}, {name: "carson", age: 25}]
var mapCallBack = (o) => ???
var filterCallback = (e) => ???
var reduceCallback = (acc, n) => ???
// the below is called chaining, and putting them on new lines is just more pretty
var answer = allThreePractice
  .map(mapCallback)
  .filter(filterCallback)
  .reduce(reduceCallback)

// same as
var answer = allThreePractice.map(mapCallback).filter(filterCallback).reduce(reduceCallback)

console.log(answer)
// answer should be 53

```

#### clear the priority form whenever you hit submit
i.e the priority you just typed in is still in the form after you add it

#### make it so the user can mark a todo item as complete
You can use a [checkbox](https://getbootstrap.com/docs/4.0/components/forms/#checkboxes-and-radios)
Or have a button that will like make the text strikedthrough or something

#### Make it so the user can choose their daily highlight

We have the todo page now, but the user cannot choose their highlight - add
something to allow the user to do this, and make the chosen highlight look
awesome
