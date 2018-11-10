var prompt = require("prompt")
prompt.start()

var priorities = []
var ADD = 'add new'
var HIGHER = 'higher'
var LOWER = 'lower'
var LIST = 'list'
var whatToDoOptions = [ADD, HIGHER, LOWER, LIST]

function addNewPriority(name, level) {
  priorities.push({name: name, level: level})
  promptForWhatToDo()
}

function promptForHigherPriority() {
  var schema = {
    properties: {
      name: {
        description: 'Which priority would you like to make higher?',
        conform: function(value) {
          return !!priorities.find(x => x.name === value)
        }
      }
    }
  };
  prompt.get(schema, function (err, result) {
    console.log(result)
    if (result) {
      makeHigherPriority(result.name)
    } else {
      console.error("oh no!", err)
    }
  })
}

function makeHigherPriority(name) {
  var priority = priorities.find(p => p.name === name)
  priority.level = priority.level - 1
  promptForWhatToDo()
}

function promptForLowerPriority() {
  var schema = {
    properties: {
      name: {
        description: 'Which priority would you like to make lower?',
        conform: function(value) {
          return !!priorities.find(x => x.name === value)
        }
      }
    }
  };
  prompt.get(schema, function (err, result) {
    console.log(result)
    if (result) {
      makeLowerPriority(result.name)
    } else {
      console.error("oh no!", err)
    }
  })
}

function makeLowerPriority(name) {
  var priority = priorities.find(p => p.name === name)
  priority.level = priority.level + 1
  promptForWhatToDo()
}

function promptForNewPriority() {
  prompt.get(['priority', 'level'], function (err, result) {
    console.log(result)
    if (result) {
      addNewPriority(result.priority, result.level)
    } else {
      console.error("oh no!", err)
    }
  })
}

function promptForWhatToDo() {
  var schema = {
    properties: {
      whatToDo: {
        description: `What do you want to do now? Options: ${whatToDoOptions.join(", ")}`,
        conform: function(value) { return whatToDoOptions.includes(value) }
      }
    }
  };
  prompt.get(schema, function (err, result) {
    console.log(result)
    if (result) {
      if(result.whatToDo === ADD){
        promptForNewPriority()
      } else if (result.whatToDo === HIGHER) {
        promptForHigherPriority() 
      } else if (result.whatToDo === LOWER) {
        promptForLowerPriority() 
      } else if (result.whatToDo === LIST) {
        drawPriorities()
      }
    } else {
      console.error("oh no!", err)
    }
  })
}

function drawPriorities() {
  if (priorities.length === 0) {
    console.log("no priorities yet you lazy bum!")
  } else {
    console.log(priorities.map(function (p) { return prettyPriority(p) }).join("\n"))
  }
  promptForWhatToDo()
}

function prettyPriority(priority) {
  return `${priority.level}: ${priority.name}`
}

promptForWhatToDo()