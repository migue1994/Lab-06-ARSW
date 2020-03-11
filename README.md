# Lab-6-ARSW

# Authors

- ## Natalia Durán
- ## Miguel Rivera

# Compile and run instructions

To download the project, we must open a cmd terminal and go to any directory, then we write the next code:

```$ git clone https://github.com/migue1994/Lab-06-ARSW.git```

After that, the project will be dowloaded in the directory where we are in.
To execute the project, write the code

```$ gradle runBoot```

And we go to the localhost address in our browser. There will be the main page of the web application where we can enter the name of any author and it displays a list with the name of all blueprints available, next to a button that allows us to draw the points of the blueprint in the canvas.

# Blueprint Management 4 - Heavy Clients

## Adding action listener to canvas

The first step is add the code needed to perform the action listener that allows us to paint some aditionals points, so the bellow code show how that function was implemented.

![startCanvas]()

Once we run the service, we can now paint more lines in to the load canvas of the any author as we can see in the next image.

![muestraCanvas]()

In the code shown beforely, the new point added is join with the las point on the canvas.

So now, we have to add a save/update and a delete button, wich allows us to perform update, save and delete funcionalities with a selected blueprint, then the first step is put the button tags in the html file

![save-delete-button-tags]()

After, we must add the functionalities in the app.js file, which perform the corresponding actions of the buttons.

![saveFunctionality]()

![deleteFunctionality]()

The above functions shown, depend on the functions that are located in the apiclient.js file, which allow connect the fronted view with backend and fetch the information we need. This functions are shown in the following picture.

![saveRest]()

![deleteRest]()

Finally, we must add a button which allows as create a new blueprint where we enter a new blueprint's name, after press the save button and the new blueprint will appear in the blueprints table and we can add new points as we was doing before.

The html tag is bellow.

![createTag]()

And the app.js code as follows

![createApp]()

Once we enter the new blueprint's name, we must press the save/update button, its will invoke the update function located in app.js and perform an action depending of the name attribute, if it is null, the current blueprint will be updated or if it is not null, a new blueprint will be created with the atribute name.

Then, if we execte the app in the localhost address, we are going to have the next.

![getName]()

![newBlueprint]()

![lastImage]()