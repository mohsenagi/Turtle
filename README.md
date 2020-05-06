# Turtle

This is a simple Single Page App excersise. Imagine you're a turtle starting at 0,0 that needs to follow the directions in a text file. The text file should be a .txt file that has only one line (it could be a very long line) and contains only the letters 'F', 'L', and 'R'. Each letter represents a movement, L means the turtle turns counterclockwise, R means the turtle turns clockwise, and F means forward. Note, turning the turtle only changes the turtle's orientation.

The App takes in a .txt file and displays 1) The full path that that turtle travelled, 2) The end location of the turtle, and 3) all of the points where the turtle has traveled to more than once.

## Built With

* [React](https://reactjs.org) - JS framework for the front-end Single Page App
* [Python](https://www.python.org/) - for the back-end App including the API that serves the front-end.
* [pytest](https://docs.pytest.org/en/latest/) - python testing framework.

## To run the App on your computer

First, clone this repository to your computer.

Python and pipenv is required to run the App.

After python and pipenv are installed, navigate to the root directory of this project and run the following command to install all dependencies from Pipfile.

```sh
pipenv install
```

Then, run the following command that puts you into pipenv python environment.

```sh
pipenv shell
```

Now that the project and all its dependencies are installed and we are in the correct python environment, run the following command to run the App.

```sh
python web.py
```

The python App is now running on your computer and will serve the Single Page App. 

In your browser address enter the following:
- http://localhost:5000
you should see the single page App.

Now upload a .txt file that has only one line (it could be a very long line) and contains only the letters 'F', 'L', and 'R' to see the corresponding path of it.

There are some sample .txt files in the "text files" folder that you can try uploading to see the path.

You can get creative and draw some cool shapes like the one by the swirl.txt sample file.