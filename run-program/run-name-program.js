const runFile = require('./challenge-with-classes.js')

const inFile = process.argv[2]
const outFile = process.argv[3]

if (!outFile) {
  throw new Error('Script required two arguments, an input file and an output file.')
}

runFile(inFile, outFile)
