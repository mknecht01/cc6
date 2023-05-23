//Part 1: 'clean the room' code challenge

function cleanTheRoom(inputArray) {
	const strArray = [];
	const numArray = [];
	let cleanedRoom = [];
	
	// separate elements of input array into an array of strings and an array of numbers
	for (elem of inputArray) {
		let type = typeof elem;
		if (type === "string") {
			strArray.push(elem);
		} else {
			numArray.push(elem);
		}
	}
	
	// sort arrays
	strArray.sort((a,b) => a-b);
	numArray.sort((a,b) => a-b);
		
	// hash the elements to count number of occurrences of each value	
	function arrangeItems(arr) {
		const hash = {};
		let subArray = [];
		const resultArray = [];
		
		for (elem of arr) {
			if (!hash[elem]) {
				hash[elem] = 1;
			} else {
				hash[elem] += 1;
			}
		}
		
		for (let [item, occurrs] of Object.entries(hash)) {
			// check to see if the input array is numbers
			// if so, turn object keys (item) back into numbers
			// otherwise, leave them as strings
			let type = typeof arr[0];
			if (type === 'number') {
				item = parseInt(item);
			}
			// if the key occurs more than once, loop to fill a subarray with that many occurrences, 
			//   then push the subarray to the results array
			if (occurrs > 1) {
				subArray = [];
				for (let i = 1; i <= occurrs; i++) {
					subArray.push(item);
				}
				resultArray.push(subArray);
			} else {
				// otherwise just push the key (item) one time to the results array
				resultArray.push(item);
			}
		}
		return resultArray;
	}
	
	//run arrangeItems() once for the strings and once for the numbers
	const strResults = arrangeItems(strArray)
	const numResults = arrangeItems(numArray)
	
	// compose the string results and number results into a composite array and return 
	if (strResults.length === 0) {
		cleanedRoom = numResults;
	} else if (numResults.length === 0) {
		cleanedRoom = strResults;
	} else {
		cleanedRoom.push(numResults);
		cleanedRoom.push(strResults);
	}
	
	return cleanedRoom;
}

const input1 = [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20]
const input2 = [1, 2, '2', '3'];
let cleaned = cleanTheRoom(input2);
console.log(cleaned);  


// Part 2: return array elements that add to a given number

function addToSum(arr, sum) {
	// create set to track values already seen
	const s = new Set();
	const results = [];
	for (value of arr) {
		if (typeof value !== 'number') {
			return 'Invalid input: all array elements must be integers'
		}
		
		let temp = sum - value;
		// if the set contains the value which would complete the current value, 
		//   add the pair to the results array and return
		if (s.has(temp)) {
			results.push(value);
			results.push(sum-value);
			return results.sort((a,b) => a-b);
		
		// otherwise, add the current value to the set and iterate to the next value in 'arr'
		} else {
			s.add(value);
		}
	}
	// if no pair is found for the given sum, return empty array
	return []
}

const testArr1 = [-2, 0, 1, 2, 4]
const testSum = 2
console.log(addToSum(testArr1, testSum))






// Part 3: hex to RGB coding challenge

function convertColor(str) {
	if (!str || str.length === 0) {
		return 'Invalid input: Function requires a string argument'
	}
	
	let workStr = str.trim();
	
	
	if (workStr[0] !== '#' && workStr[0] !== 'r') {
		return 'Invalid input: Argument must be a valid HEX or RGB color string' 
	}
	
	let result = '';
	
	if (workStr[0] === '#') {
		result = hexToRGB(workStr)
	} else if (workStr[0] === 'r') {
		result = rgbToHex(workStr)
	}
	
	return result;
	
	function hexToRGB(hexStr) {
		const hexTemp = []
		
		// divides hex string into red, green, and blue portions. pushes them to a temp array
		const hexRed = hexStr.slice(1,3);
		hexTemp.push(hexRed);
		const hexGreen = hexStr.slice(3,5);
		hexTemp.push(hexGreen);
		const hexBlue = hexStr.slice(5);
		hexTemp.push(hexBlue);
		
		// maps each array element to new array converting hex to decimal via parseInt()
		const rgbTemp = hexTemp.map(elem => {
			return parseInt(elem, 16)
		});
		
		// returns 'rgb' string with the converted numbers, no whitespace
		return `rgb(${rgbTemp[0]},${rgbTemp[1]},${rgbTemp[2]})`;
	}
	
	function rgbToHex(rgbStr) {
		const tempRgb = [];
		//create an array matching the numerals in the rgb string
		const matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
		let match = matchColors.exec(rgbStr);
		//loop over the array and push the three appropriate elements into the tempRgb array
		for (let i = 1; i <= 3; i++) {
			tempRgb.push(parseInt(match[i]));
		}
		//via 'map()' convert decimals to base16 and join into 6 digit hex color, then add
		//   the '#' in the return string
		const tempHex = tempRgb.map(elem => {
			return elem.toString(16)
		}).join('');
		
		return `#${tempHex}`
	}
}

testStr1 = '    rgb(127, 128, 129)'
testStr2 = '#b2d3a8    '

console.log(convertColor(testStr1))
console.log(convertColor(testStr2))



