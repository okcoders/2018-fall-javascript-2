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

## What happens when a browser loads a page

We talked a lot about what happens when you load up javascript (first pass,
second pass), but when we get to the browser there is a little bit more going
on.

First, we can load more than one javascript file, or run javascript directly
with the <script> tag. We talked about the global scope, and how functions are
the only way to make a new scope. Managing not cluttering the state becomes very
important as we load more and more javascript files!

Second, we have two other languages involved: html and css.

The browser does not follow the same two pass strategy javascript follows (it
does when it runs the javascript, but not "above" that). So we are in a line by
line situation here. 

As it goes line by line, it draws stuff on the page as soon as it can. Your eye
usually doesn't see this, but sometimes with really slow internet you might.

Note, that this means that javascript that runs before html is "loaded", or what
is more often said, "in the dom", cannot reference said unloaded html.

Also, it is important to think of your html as a tree. Think of it more like an
ancestor tree though - html has root ancestors, children, siblings, etc.

For example:

```
<html>
  <body>
    <div>
      <h1>
      </h1>

      <h2>
      </h2>
    </div>
  </body>
</html>
```

can be thought of like so:

            html
             |
            body
             |
            div
           /   \
          h1   h2
            

To be able to know these relationships, html is a "context" holding language,
meaning you need knowledge of prior lines in order to know how to interpret the
current one.

A lot of this is more than you need to know though, the improtant thing is to
know that it does this loading all in one pass. It doesn't do more than one
thing at a time. So if you put some javascript in your page at the top, and have
that javascript do a bunch of stuff, or for fun, just stick a while loop in
there, the rest of the page will not show up for a while or at all. 

All this to say, people put javascript at the bottom of web pages.

## Homework

#### clear the priority form whenever you hit submit
i.e the priority you just typed in is still in the form after you add it

#### make the todo page
have a form that takes new todo names, and then render them on the page just
like we do priorities

#### Make it so the user can choose their daily highlight

We have the todo page now, but the user cannot choose their highlight - add
something to allow the user to do this, and make the chosen highlight look
awesome
