# Class 3

* homework solutions
* structuring our project
* what happens when you load the page
* how to think about our approach to making the web app

## Homework solutions

### clear the priority form whenever you hit submit
```
var input = document.getElementById('exampleInputPriority1')
input.value = ""
```

### make it so you can mark todos as complete

```
// need to add a new key to our toDos
toDos.push({name: currentToDo, level: nextToDoLevel, done: false})

function checkboxChange(event) {
  var toDo = toDos.find(t => t.name === event.target.value)
  toDo.done = !toDo.done
}

var checked = x.done ? 'checked': ''
return `<li class="list-group-item">
<span class="badge badge-primary badge-pill"> ${x.level} </span>
<span>${x.name}</span>
<div class="form-check form-check-inline">
<input 
  onchange="return checkboxChange(event)" 
  value="${x.name}" 
  type="checkbox" 
  class="form-check-input position-static" 
  id="exampleCheck1" 
  ${checked}>
</div>
```

### let user choose their daily highlight

below is a git diff of the changes:

```
diff --git a/make-time/todo.html b/make-time/todo.html
index 2aa9ee5..5c2a915 100644
--- a/make-time/todo.html
+++ b/make-time/todo.html
@@ -40,10 +40,10 @@
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
   <script>
     var currentToDo = ""
-    var toDos = [{name: 'chicken', level: 1, done: true}]
+    var toDos = [{name: 'chicken', level: 1, done: true, highlight: false}]
     function addNewToDo(event){
       var nextToDoLevel = toDos.length + 1
-      toDos.push({name: currentToDo, level: nextToDoLevel, done: false})
+      toDos.push({name: currentToDo, level: nextToDoLevel, done: false, highlight: false})
       drawToDos()
       return false;
     }
@@ -57,6 +57,15 @@
       toDo.done = !toDo.done
     }

+    function makeHighlight(name) {
+      var toDo = toDos.find(t => t.name === name)
+      toDo.highlight = true
+      var otherToDos = toDos.filter(t => t.name !== name)
+      otherToDos.map(t => t.highlight = false)
+
+      drawToDos()
+    }
+
     function makeHigherToDo(name) {
       var toDo = toDos.find(p => p.name === name)
       var currentLevel = toDo.level
@@ -86,6 +95,7 @@
         .map(x => {
           var disabledHigher = x.level === 1 ? 'disabled': ''
           var disabledLower = x.level === toDos.length ? 'disabled': ''
+          var disabledHighlight = x.highlight ? 'disabled': ''
           var checked = x.done ? 'checked': ''
           return `<li class="list-group-item">
           <span class="badge badge-primary badge-pill"> ${x.level} </span>
@@ -100,6 +110,7 @@
             ${checked}>
           </div>
           <span class="float-buttons">
+            <button ${disabledHighlight} onclick="return makeHighlight('${x.name}')" type="button" class="btn btn-sm btn-outline-success">Make Highlight</button>
             <button ${disabledHigher} onclick="return makeHigherToDo('${x.name}')"
               type="button" class="btn btn-sm
               btn-outline-primary">Make Higher To-Do Item

```

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

Also keep in mind every html page has a brand new scope. And that scope goes
away whenever you refresh the page. 

### structuring our project

we will always have an index.html file for any web app we make. That file is the
first thing people see whenever they load your web app. Any server knows that
the root of the route should go to the index.html file (more on routes in a
minute). From there, you need to
provide a nav bar that will allow them to navigate to other parts of the site.
The other parts of your site correspond to other index files that you make, and
your route should usually match the name of the html file.

Each page will have it's own new scope remember, so without other tools we will
learn about later (like reaching out to a database to get data on page load),
we won't be able to pass information to other pages.

If we have a new scope each time, how do we share certain things that are common
across pages? Keep in mind you can load javascript on any page, so anything
common that we need, we can put in one javascript file, and load that on each
page. 

## our approach

most pages we make in our web app will do very similar things in the abstract:

* take in data from the user through forms
* display the data we do have
* modify the existing data through actions (button clicks)

That is it! So if we are doing these things over and over, there must be a
pattern we can follow, indeed, the pattern we will follow is thinking about
changing the "state" of our data (often called "model"), and then just making
sure to have the page change whenever our state changes.

So we have three things, state, the page, and actions.

The page should always represent what is in the state. Whenever state changes,
we need to make sure to update the page. 

The page has buttons that will trigger actions. Actions usually update the
state. 

So, actions update the state, which updates the page.

Whenever you are working on a new page from scratch, first think about your
model/state. Create some sample data and hardcode that into the state. Then,
"hook" your state up to the page. Then, start creating actions (functions) to update the
state. Then hook those actions up to buttons!

An example of this is our priority page. 

State of priority page:
* priorities array
* current priority

actions of priority page:
* makeHigherPriority
* priorityChange
* makeLowerPriority

our hooking up of the state to the page:
* drawPriorities

hooking actions to buttons:
* we acheive that with the onclick html param on on our buttons

## Homework

### add a progress bar that shows the percent of todos checked off for the day

### make it so the user can tag todo items with priorities

### design (don't actually code anything) what the past days page should look like
