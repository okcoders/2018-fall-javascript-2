# Class 1
* review
* program execution
* the make time app overview
* fix the bug

## review

[mdn guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)

### [types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

* string
* number
* boolean
* undefined
* null
* NaN
* There is also the Date object (we will typically use Moment.js for date handling)

#### Beyond types we also have Data Structures or "Collections"

* objects (known as a map, or hash map in computer science)
* arrays (an ordered list)

Objects and Arrays can hold any "type" of data, and they don't have to be
homogenous 

#### Variables
* var test = "hello!"
* proper variable naming

#### Functions
* function helloWorld(param1, param2) { return param1 }
* var helloWorld = function(param1, param2) { return param2 }
* higher order functions

#### Control Flow
* if, if else, else
* for
* while

#### Operations
* +, -, /, %, \*, Math object
* &&, ||, ==, ===, !, !=, !==, <=, >=, <, >, 

## program execution

#### some concepts
* vars and functions are hoisted during a "first pass", then the program is ran
  line by line, only skipping or jumping around for control flow (for, ifs) or
  for function calls
* functions create new scopes, if you are not in a function you are in the Global scope
* outer scopes can't touch inner ones, but inner ones can touch outer ones
* lines are evaluated inside out
* statements vs. expressions (lines either have a value or are a side effect,
  and the value is undefined)
* shadowing (when you reuse the same variable name inside a function that exists
  in the global scope)

* [program breakdown for the web](http://www.pythontutor.com/javascript.html#mode=display)

let's walk through this program:
```
var priorities = []
var ADD = 'add new'
var HIGHER = 'higher'
var LOWER = 'lower'
var LIST = 'list'
var whatToDoOptions = [ADD, HIGHER, LOWER, LIST]

function addNewPriority(name, level) {
  priorities.push({name: name, level: level})
}

function makeHigherPriority(name) {
  var priority = priorities.find(p => p.name === name)
  priority.level = priority.level - 1
}

function makeLowerPriority(name) {
  var priority = priorities.find(p => p.name === name)
  priority.level = priority.level + 1
}

function drawPriorities() {
  if (priorities.length === 0) {
    console.log("no priorities yet you lazy bum!")
  } else {
    console.log(priorities.map(function (p) { return prettyPriority(p) }).join("\n"))
  }
}

function prettyPriority(priority) {
  return `${priority.level}: ${priority.name}`
}

drawPriorities()
addNewPriority("study for ok coders", 2)
addNewPriority("family and friends", 1)
makeHigherPriority("study for ok coders")
makeLowerPriority("family and friends")
drawPriorities()
```

## the bugs

#### priorities can become negative

Modify the code to prevent that from happening

#### priorities can go lower in priority indefinitely 

Modify the code to have the lowest priority not go any higher (i.e, if you have
5 priorities, the lowest priority would have the number 5, and should not be
able to go to 6 or 7)

## the homework
you can have priorities with the same value. We should add some logic to prevent
this from happening. One option would be to give some kind of error when the
user chooses a priority level that already exists - this is an option, but by
changing the ui a little, we may end up with less code, and with a better ui.

Change the UI to not take the priority level as a parameter. When one adds a new
priority, you should just give that new item the next available priority level.

Now, when the user clicks the Make Higher Priority and Make Lower Priority
buttons, they should shift the surrounding priorities appropriately. This means
if I have three items, and I make item #2 lower priority, item #3 should become
item #2 in terms of priority

Refactor the code to accomplish the above.

no need to read
  [this](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/),
  but it gives a rather deep dive into how the browser reads and the makes a
  webpage from an html document

## One high level concept

Notice we have some functions that are sort of the core of our priority list.
Meaning, the functions exist pretty much exactly the same in our node version,
and our web version (add priority, make higher priority, make lower). This kind
of logic is often referred to as business logic, i.e a lot of companies end up
having very similar code (display data on a web page) that they will actually
share with each other (react framework, for example), but what makes the
money/what is unique is the business logic.
