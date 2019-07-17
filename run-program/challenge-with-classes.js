const fs = require('fs')
const knuthShuffle = require('knuth-shuffle').knuthShuffle

class NameParser {
  // Set up function to read file and output full data within file
  constructor (inFile, outFile) {
    this.inFile = inFile
    this.outFile = outFile
    this.readFile = function readFile (inFile) {
      return new Promise((resolve, reject) => {
        fs.readFile(inFile, 'utf8', (err, data) => {
          return err ? reject(err) : resolve(data)
        })
      })
    }
  }

  // takes file name and trims data to return array of first and last names
  async trimData () {
    const trimmedNames = []
    const response = await this.readFile(this.inFile)
    const evenIndex = (element, index) => index % 2 === 0
    // splits response data by line then filters by every other line (lines
    // that names are included on)
    const nameRow = response.split('\n').filter(evenIndex)
    // loops through lines to separate first and last name data, then pushes first
    // and last name data to trimmedNames array
    nameRow.forEach((element) => {
      const firstName = element.split(' ')[1]
      const lastNameWithComma = element.split(' ')[0]
      // removes comma from last name
      const lastName = lastNameWithComma.substring(0, lastNameWithComma.length - 1)
      trimmedNames.push(firstName + ' ' + lastName)
    })
    // remove empty last element of array (caused by blank line at end of text file)
    trimmedNames.pop()
    return trimmedNames
  }

  // Unique function to be used below
  uniqueElement (value, index, self) {
    return self.indexOf(value) === index
  }
  // Write file append function to be used below
  appendSolution (outFile, writeData) {
    return new Promise((resolve, reject) => {
      fs.appendFile(outFile, writeData, (error, data) => {
        if (error) {
          reject(error)
        }
        resolve(data)
      })
    })
  }

  // 1. The unique count of full names (i.e. duplicates are counted only once)
  async uniqueFullNameCount () {
    const nameData = await this.trimData(this.inFile)
    const uniqueFullNames = nameData.filter(this.uniqueElement)
    console.log('1.) The unique count of full names is ', uniqueFullNames.length)
    const writeData = '1.) The unique count of full names is ' + uniqueFullNames.length + '\n'
    this.appendSolution(this.outFile, writeData)
  }

  // 2. The unique count of last names
  async uniqueLastNameCount () {
    const nameData = await this.trimData(this.inFile)
    const lastNames = []
    nameData.forEach((element) => {
      const lastNameData = element.split(' ')[1]
      lastNames.push(lastNameData)
    })
    const uniqueLastNames = lastNames.filter(this.uniqueElement)
    console.log('2.) The unique count of last names is ', uniqueLastNames.length)
    const writeData = '2.) The unique count of last names is ' + uniqueLastNames.length + '\n'
    this.appendSolution(this.outFile, writeData)
  }

  // 3. The unique count of first names
  async uniqueFirstNameCount () {
    const nameData = await this.trimData(this.inFile)
    const firstNames = []
    nameData.forEach((element) => {
      const firstNameData = element.split(' ')[0]
      firstNames.push(firstNameData)
    })
    const uniqueFirstNames = firstNames.filter(this.uniqueElement)
    console.log('3.) The unique count of first names is ', uniqueFirstNames.length)
    const writeData = '3.) The unique count of first names is ' + uniqueFirstNames.length + '\n'
    this.appendSolution(this.outFile, writeData)
  }

  // 4. The ten most common last names (the names and number of occurrences)
  async commonLastNames () {
    const nameData = await this.trimData(this.inFile)
    const lastNameOccur = {}
    const lastNames = []
    nameData.forEach((element) => {
      const lastNameData = element.split(' ')[1]
      lastNames.push(lastNameData)
    })
    // Organize last names into object with name and occurrences
    lastNames.forEach(element => {
      if (lastNames.length === 0) {
        return null
      }
      if (!lastNameOccur[element]) {
        lastNameOccur[element] = 1
      } else {
        lastNameOccur[element]++
      }
    })
    // Organize names and occurrences into array before sorting
    const sortedLastNameOccur = []
    let topTenOccurence = null
    for (const lastName in lastNameOccur) {
      sortedLastNameOccur.push([lastName, lastNameOccur[lastName]])
    }
    // Sort the name occurrences array based on number of occurrences and
    // return the names and number of occurrences of the top 10. If less than
    // 10, return all of them.
    sortedLastNameOccur.sort((a, b) => {
      return a[1] - b[1]
    })
    if (sortedLastNameOccur.length < 10) {
      topTenOccurence = sortedLastNameOccur
    } else {
      topTenOccurence = sortedLastNameOccur.slice(-10)
    }
    console.log('4.) The top ten most common last names are ', topTenOccurence)
    const writeData = '4.) The top ten most common last names are ' + topTenOccurence + '\n'
    this.appendSolution(this.outFile, writeData)
  }

  // 5. The ten most common first names (the names and number of occurrences)
  async commonFirstNames () {
    const nameData = await this.trimData(this.inFile)
    const firstNameOccur = {}
    const firstNames = []
    nameData.forEach((element) => {
      const firstNameData = element.split(' ')[0]
      firstNames.push(firstNameData)
    })
    // Organize last names into object with name and occurrences
    firstNames.forEach(element => {
      if (firstNames.length === 0) {
        return null
      }
      if (!firstNameOccur[element]) {
        firstNameOccur[element] = 1
      } else {
        firstNameOccur[element]++
      }
    })
    // Organize names and occurrences into array before sorting
    const sortedFirstNameOccur = []
    let topTenOccurence = null
    for (const firstName in firstNameOccur) {
      sortedFirstNameOccur.push([firstName, firstNameOccur[firstName]])
    }
    // Sort the name occurrences array based on number of occurrences and
    // return the names and number of occurrences of the top 10. If less than
    // 10, return all of them.
    sortedFirstNameOccur.sort((a, b) => {
      return a[1] - b[1]
    })
    if (sortedFirstNameOccur.length < 10) {
      topTenOccurence = sortedFirstNameOccur
    } else {
      topTenOccurence = sortedFirstNameOccur.slice(-10)
    }
    console.log('5.) The top ten most common first names are ', topTenOccurence)
    const writeData = '5.) The top ten most common first names are ' + topTenOccurence + '\n'
    this.appendSolution(this.outFile, writeData)
  }

  // 6. A list of 25 completely unique names (see below for details)
  async completelyUniqueNames (nNumberNames) {
    // modified version of trimData function
    const response = await this.readFile(this.inFile)
    const evenIndex = (element, index) => index % 2 === 0
    // splits response data by line then filters by every other line (lines
    // that names are included on)
    const nameRow = response.split('\n').filter(evenIndex)
    const trimmedFullNames = []
    // loops through lines to separate first and last name data
    nameRow.forEach((element) => {
      const firstName = element.split(' ')[1]
      const lastNameWithComma = element.split(' ')[0]
      // removes comma from last name
      const lastName = lastNameWithComma.substring(0, lastNameWithComma.length - 1)
      trimmedFullNames.push([firstName + ' ' + lastName])
    })
    // remove empty last element of array (caused by blank line at end of text file)
    trimmedFullNames.pop()

    // once data has been gathered above, loop through all name data
    const fullyUniqueNames = []
    const lastNameData = []
    const firstNameData = []
    // set max size (N) based on completelyUniqueNames function parameters
    const maxSize = nNumberNames
    trimmedFullNames.forEach(name => {
      if (fullyUniqueNames.length === maxSize) {
        return fullyUniqueNames
      }
      // reset current last and first name to null for each name in loop
      let currentLastName = null
      let currentFirstName = null
      // assign current first and last name
      currentFirstName = name[0].split(' ')[0]
      currentLastName = name[0].split(' ')[1]
      // check current name against instruction requirements
      if (firstNameData.includes(currentFirstName) || lastNameData.includes(currentLastName)) {
        firstNameData.push(currentFirstName)
        lastNameData.push(currentLastName)
      } else {
        fullyUniqueNames.push(currentFirstName + ' ' + currentLastName)
        firstNameData.push(currentFirstName)
        lastNameData.push(currentLastName)
      }
    })
    console.log('6.) Completely Unique Names N', (fullyUniqueNames.length), 'are', fullyUniqueNames)
    const writeData = '6.) Completely Unique Names N ' + fullyUniqueNames.length + ' are ' + fullyUniqueNames + '\n'
    this.appendSolution(this.outFile, writeData)
    return fullyUniqueNames
  }

  // 7. A list of 25 modified names
  async modifiedNames (nNumberNames) {
    // wait for completelyUniqueNames function to generate first N
    // number of unique names listing before shuffle
    const uniqueList = await this.completelyUniqueNames(nNumberNames)
    const firstNames = []
    const lastNames = []
    const shuffledUniqueList = []

    uniqueList.forEach(name => {
      firstNames.push(name.split(' ')[0])
      lastNames.push(name.split(' ')[1])
    })
    // shuffle listing of first and last names
    knuthShuffle(firstNames)
    knuthShuffle(lastNames)
    // loop through listing of first and last names to combine only
    // names that were not included within the original listing of
    // full names. If includedin original list, shuffle again.
    for (let i = 0; i < uniqueList.length; i++) {
      if (uniqueList.includes(firstNames[i] + ' ' + lastNames[i])) {
        knuthShuffle(firstNames)
        knuthShuffle(lastNames)
      } else {
        shuffledUniqueList.push(firstNames[i] + ' ' + lastNames[i])
      }
    }
    console.log('7.) shuffledUniqueList is ', shuffledUniqueList)
    const writeData = '7.) shuffledUniqueList is ' + shuffledUniqueList + '\n'
    this.appendSolution(this.outFile, writeData)
  }
}

// main function to run challenge with specified data input file and output
// location (specified in run-name-program.js)
function runFile (inFile, outFile) {
  const currentTest = new NameParser(inFile, outFile)
  currentTest.uniqueFullNameCount()
  currentTest.uniqueLastNameCount()
  currentTest.uniqueFirstNameCount()
  currentTest.commonLastNames()
  currentTest.commonFirstNames()
  currentTest.modifiedNames(25)
}

module.exports = runFile
