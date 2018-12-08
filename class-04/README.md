# Class 4

## Homework solutions

### to do items with the same name

Add this between your submit button and the todo name input

```
<div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div>
```

Then add this to the addNewToDo function

```
function addNewToDo(event){
  var element = document.getElementById("duplicate-name-alert")
  var classList = element.classList
  classList.add("alert-hidden")
  var duplicateToDo = toDos.find(todo => todo.name === currentToDo)
  if (duplicateToDo) {
    var element = document.getElementById("duplicate-name-alert")
    var classList = element.classList
    classList.remove("alert-hidden")
  }
  var nextToDoLevel = toDos.length + 1
  toDos.push({name: currentToDo, level: nextToDoLevel, done: false, highlight: false})
  drawToDos()
  return false;
}
```

### progress bar for percent of todos completed

```
var progressNumber = (toDos.filter(t => t.done).length / toDos.length) * 100
var progressBar = `<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: ${progressNumber}%" aria-valuenow="${progressNumber}" aria-valuemin="0" aria-valuemax="100"></div>
</div>`
var progress = document.getElementById("progress")
progress.innerHTML = progressBar

```

### tag todos with priorities

```
var priorityOptions = ['', 'Family', 'OKCoders', 'Health']

function priorityOptionsHtml(chosen) {
  chosen ? chosen: ""
  return priorityOptions
    .map(o => {
      var selected = o === chosen ? 'selected': ''
      return `<option value="${o}" ${selected}>
         ${o}
       </option>`
    })
    .join("")
}

function prioritySelected(e) {
  console.log(e)
  var name = e.target.id
  var value = e.target.value
  var toDo = toDos.find(t => t.name === name)
  toDo.priority = value
  return false
}

var options = priorityOptionsHtml(x.priority)

<span class="form-group">
<label for="exampleFormControlSelect1">Priority Tag</label>
<select id="${x.name}" onchange="return prioritySelected(event)" class="form-control inline" id="exampleFormControlSelect1">
  ${options}
</select>
</span>

```

## Try to break functionality out into new functions

Whenever you are fixing bugs or adding new features, you should be adding new
functions. If you are just adding code to existing functions, that is a code
smell. 

There are many reasons for this (code is easier to read, less scope bloat), but
the one that is most convincing to me is what is called composability. The more
functions you have, the more programs you can make by stringing existing
functions together in new and unique ways.

### what are some areas ripe for "breaking out"

Ways to identify places that are good to break up:
* breaks DRY
* function is "long", i.e has a lot of lines
* intent is not clear (for example inside the addNewPriority function)

Areas we can improve:
* make higher and lower to do level
* drawToDos 
  * because it is too long
  * we repeat ourselves when "resolving to empty string"
  * we repeat ourselves when adding html to an element


## Walk through ideas for how the past toDos page should look

## Project

### Finish the past todos page
