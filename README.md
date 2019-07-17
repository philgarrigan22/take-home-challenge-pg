## Summary

As per instructions, the program processes a data file that contains people's names, outputs some statistics and generates output. The program produces an output file (saved to the location of your choice) as well as displaying the output results in the terminal. For purposes of the challenge, the output file for the provided data is located in the 'data-and-instructions' folder, has been saved under the title 'challenge-output-file.txt', and slightly edited for readability purposes.

The program performs and returns the following, based on the data given to it:
1. The unique count of full names (i.e. duplicates are counted only once)
2. The unique count of last names
3. The unique count of first names
4. The ten most common last names (the names and number of occurrences)
5. The ten most common first names (the names and number of occurrences)
6. A list of 25 completely unique names (see below for details)
7. A list of 25 modified names (see below for details)

## Development Process

1. I first focused on getting the program to be functionally correct and returning the correct output to the terminal.
2. After the above, I refactored the code and added class functionality (as my initial implementation was one large function performing all above functions in one swoop)
3. I then implemented the code necessary to generate a separate output file, saved to the location of the user's choosing.
4. Next, I added code to support stdin/stdout so that the input file and output file name and location could be specified and run all within the terminal.
5. I then refactored the code again and added clarifying comments to try and improve readability

## Installation instructions

```
npm install
```

## Running the program
To utilize the data included within the project to run the program:

1.) Navigate within the terminal to the project root directory.

2.) Run the program as follows from the project root directory:

**Run program command**
```
node run-program/run-name-program.js [file path to input data file] [desired file path for output file]
```

**EXAMPLE: Run program utilizing data within project file and save output file to project directory**
```
node run-program/run-name-program.js data-and-instructions/yesware-take-home-data.txt data-and-instructions/test-file-challenge-results.txt
```

Solution will by included within the desired output file and presented within the terminal.
