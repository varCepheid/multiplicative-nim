const parameters = {
	classicMode: true,
	maxEntry: 9,
	target: 1000,
	misere: false,
	hardMode: false
}
let product = 1
let entries = []
let gameOver = false

/** Set the parameters and display the playing space. */
const start = () => {
	if(parameters.classicMode) {
		parameters.maxEntry = 9
		parameters.target = 1000
		parameters.misere = false
		parameters.hardMode = false
	} else {
		parameters.maxEntry = document.getElementById("max-entry").value
		parameters.target = document.getElementById("target").value
	}

	document.getElementById("starter").style.display = "none"
	document.getElementById("play-space").style.display = "block"

	gameOver = false
}

/** Called when the user submits an entry. */
const handleEntry = () => {
	// clear previous error
	createError("")

	// check that submission is valid and submit it
	for(let i = 0; i < 1; i++){
		const entry = parseInt(document.getElementById("entry-box").value)
		if (entry == NaN) {
			createError("Entries must be positive integers.")
			break
		}
		if ((entry < 2) || (entry > parameters.maxEntry)) {
			createError("Entries must be between 2 and " + parameters.maxEntry + ".")
			break
		}
		handleNumber(entry)
	
		// create computer response if player didn't win
		if(!gameOver) {
			if (parameters.hardMode) {
				
			} else {
				const oppEntry = Math.floor(Math.random() * (parameters.maxEntry - 1)) + 2
				handleNumber(oppEntry)
			}
		}
	}
	
	// clear entry box
	document.getElementById("entry-box").value = ""
}

/** Updates product total and entry list for each number submitted by the user or the computer. */
const handleNumber = (number) => {
	entries.push(number)
	updateEntries()
	
	product *= number
	updateProduct()
}

/** Update the displayed product total, and check if the target value has been reached. */
const updateProduct = () => {
	if (product >= parameters.target) {
		handleWin()
	}
	document.getElementById("product").innerHTML = product
}

/** Update the displayed list of submitted numbers. */
const updateEntries = () => {
	let entryList = ""
	entries.forEach((entry) => {
		entryList = entryList + " " + entry.toString()
	})
	document.getElementById("entry-list").innerHTML = entryList
}

/** Reset the entire game. */
const reset = () => {
	product = 1
	entries = []
	updateProduct()
	updateEntries()

	document.getElementById("end-message").style.display = "none"
	document.getElementById("entry-box").style.display = "inline"
	document.getElementById("submitter").style.display = "inline"
	document.getElementById("entry-box").value = ""

	start()
}

/** Set the text of the error-message element. */
const createError = (message) => {
	document.getElementById("error-text").innerHTML = message
}

/** Figure out who won, display an end message, and hide the entry box. */
const handleWin = () => {
	if(!gameOver) {
		const userWin = entries.length % 2
		const element = document.getElementById("end-message")
		if (userWin === 1) {
			element.innerHTML = "Congratulations, you won!"
			element.style.color = "green"
		} else {
			element.innerHTML = "Sorry, the computer beat you to " + parameters.target + "."
			element.style.color = "red"
		}
		element.style.display = "block"
		gameOver = true
	}

	document.getElementById("entry-box").style.display = "none"
	document.getElementById("submitter").style.display = "none"
}

/** Toggle the win condition. */
const switchWinType = () => {
	parameters.misere = !parameters.misere
	if (parameters.misere) {
		document.getElementById("win-type-message").innerHTML = "Misere -- You lose if you exceed the target value."
		document.getElementById("win-type-switcher").value = "Switch to Regular"
	} else {
		document.getElementById("win-type-message").innerHTML = "Regular -- You win if you exceed the target value."
		document.getElementById("win-type-switcher").value = "Switch to Misere"
	}
}

/** Toggle the computer-selection mode. */
/* const switchComputerMode = () => {
	parameters.hardMode = !parameters.hardMode
	if (parameters.hardMode) {
		document.getElementById("computer-mode-message").innerHTML = "Hard -- The computer chooses values optimally."
		document.getElementById("computer-mode-switcher").value = "Switch to Easy Mode"
	} else {
		document.getElementById("computer-mode-message").innerHTML = "Easy -- The computer chooses values randomly."
		document.getElementById("computer-mode-switcher").value = "Switch to Hard Mode"
	}
} */

/** Toggle the parameter setup. */
const switchParameterSetup = () => {
	parameters.classicMode = !parameters.classicMode
	if(parameters.classicMode) {
		document.getElementById("parameters").style.display = "none"
		document.getElementById("parameter-mode-message").innerHTML = "Playing Classic Mode"
		document.getElementById("parameter-mode-switcher").value = "Set Custom Parameters"
		document.getElementById("parameter-mode-notes").innerHTML = "Switching to custom parameters will reset the game."
		
		reset()
	} else {
		document.getElementById("parameters").style.display = "block"
		document.getElementById("parameter-mode-message").innerHTML = "Playing With Custom Parameters"
		document.getElementById("parameter-mode-switcher").value = "Back to Classic"
		document.getElementById("parameter-mode-notes").innerHTML = "Switching to Classic will reset the game."

		reset()
	}
}