# The Make Time App

## setting up the project from scratch

```
mkdir make-time
cd make-time
touch index.html
npm init
npm install -g browser-sync
```

Now, open the make-time directory in vscode. Let's edit our package.json

Make the scripts object look like this:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "browser-sync start -s -f . --no-notify --host localhost --port 9000"
  },
```

Edit your index.html file to have some content in it, perhaps something like
this:

```
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />

  <title>make-time</title>
  
</head>
<body>
  <h1>
    hello world
  </h1>
</body>
</html>
```

Now, make sure your pwd is still the root of the make-time folder, if so, type
this command: `npm start`

This starts up browser-sync for us, so that now whenever we change our code
files, (for example change the code in index.html and hit save), it will
reload our page for us.
