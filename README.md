# Lab-5-ARSW

# Authors

- ## Natalia Durán
- ## Miguel Rivera

# Compile and run instructions

To download the project, we must open a cmd terminal and go to any directory, then we write the next code:

```$ git clone https://github.com/migue1994/Lab-5-ARSW.git```

After that, the project will be dowloaded in the directory where we are in.
To execute the project, write the code

```$ gradle runBoot```

And we go to the localhost address in our browser. There will be the main page of the web application where we can enter the name of any author and it displays a list with the name of all blueprints available, next to a button that allows us to draw the points of the blueprint in the canvas.

# Fronted views

After to create the directory that contains the javascript files, we've created the next index.html file:

![](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/tablehtml.PNG)

The code shown above belongs to a form that contains an input and a button, where we can query any author in as long as it is in the apimok.js file.

Once we do the query, a table will be show with the logs of the blueprints names and the number of points that owns. The code bellow correspond to the html block that makes the table.


![tablaHtml](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/table.PNG)

# Fronted Logic

Once we've copied the aplimock file to the js folder and put this files as resources in the html page, we created the javascript functions that allow us to perform the queries, this file looks as follows.

![capturaJs](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/capturaJs.PNG)

In the image above we can see the getPansByName function, wich use the get getBlueprintsByAuthor function contained in the apimock.js file, to execute the callbacks and call other function as follows

![tablaJs](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/tableJs.PNG)

The above code allows update the html table through a async method, wich allow modify the table without reload the page
Now we open the localhost address in the browser and we got this.

![withoutCanvas](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/withoutCanvas.PNG)

# Next Week

the code of the table, has a block that contains a button, wich calls a function that makes a canvas where the points of the blueprint are displayed in, this function is show in the bellow image

![canvasJs](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/canvasJs.PNG)

In the app.js file, we creted a getBlueprintsByAuthorAndName function that use the getBlueprintsByAuthorAndName function located in the apimock.js file, it query the blueprint using the author name and the blueprint name to get an object with only the points contains in that blueprint, this function has a callback that execute the getCanvas function to draw the blueprint in the browser, this function looks like as follows

![GetBlueprintByauthorandname](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/getBlueprintByAuthorAndName.PNG)

So if we open the browser in the localhost address, we'll see the next images

![TableBrowser1](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/tableBrowser1.PNG)
![TableBrowser2](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/tableBrowser2.PNG)

To connect with the API rest, we've created a new file called apiclient, this file contains the next code

![apiclient](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/Apiclient.PNG)

Now, if we execute the springboot service, we could do the same queries but this time the repository is the inMemoryBlueprintPersistance class, so it displays the next blueprints

![persistence1](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/persistance1.PNG)

![persistence2](https://github.com/migue1994/Lab-5-ARSW/blob/master/src/main/resources/img/persistance%202.PNG)

Finally, we put a button wich change the reference repository, when we start the app, the repository by default is the apimock.js, if we ckick on change repository button, the reference change to the api rest repository and vice versa.
