# Class 1
* review
* program execution
* the make time app overview
* fix the bug

## review

## program execution
* [program breakdown for the web](http://www.pythontutor.com/javascript.html#mode=display)
* no need to read
  [this](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/),
  but it gives a rather deep dive into how the browser reads and the makes a
  webpage from an html document

#### some concepts
* vars and functions are hoisted during a "first pass", then the program is ran
  line by line, only skipping or jumping around for control flow (for, ifs) or
  for function calls
* functions create new scopes, if you are not in a function you are in the Global scope
* outer scopes can't touch inner ones, but inner ones can touch outer ones
* shadowing (when you reuse the same variable name inside a function that exists
  in the global scope)

##the bugs

#### priorities can become negative

Modify the code to prevent 

#### priorities can go lower in priority indefinetely 

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
