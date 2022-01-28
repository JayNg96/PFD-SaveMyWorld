//* ---------------------- quiz.html JS ---------------------- *//
//selecting all required elements
try {
	const start_btn = document.querySelector(".start_btn button");
	const info_box = document.querySelector(".info_box");
	const exit_btn = info_box.querySelector(".buttons .quit");
	const continue_btn = info_box.querySelector(".buttons .restart");
	const quiz_box = document.querySelector(".quiz_box");
	const result_box = document.querySelector(".result_box");
	const option_list = document.querySelector(".option_list");
	const time_line = document.querySelector("header .time_line");
	const timeText = document.querySelector(".timer .time_left_txt");
	const timeCount = document.querySelector(".timer .timer_sec");
	// if startQuiz button clicked
	start_btn.onclick = () => {
			info_box.classList.add("activeInfo"); //show info box
			$("#ready-text").hide();
		}
		// if exitQuiz button clicked
	exit_btn.onclick = () => {
			info_box.classList.remove("activeInfo"); //hide info box
			$("#ready-text").show();
		}
		// if continueQuiz button clicked
	let category;
	function selectCat(id){
		category = id
		info_box.classList.remove("activeInfo"); //hide info box
		quiz_box.classList.add("activeQuiz"); //show quiz box
		showQuetions(0); //calling showQestions function
		queCounter(1); //passing 1 parameter to queCounter
		startTimer(15); //calling startTimer function
		startTimerLine(0); //calling startTimerLine function
	}
	let timeValue = 15;
	let que_count = 0;
	let que_numb = 1;
	let userScore = 0;
	let counter;
	let counterLine;
	let widthValue = 0;
	const restart_quiz = result_box.querySelector(".buttons .restart");
	const quit_quiz = result_box.querySelector(".buttons .quit");
	
	// if restartQuiz button clicked
	restart_quiz.onclick = () => {
			quiz_box.classList.add("activeQuiz"); //show quiz box
			result_box.classList.remove("activeResult"); //hide result box
			timeValue = 15;
			que_count = 0;
			que_numb = 1;
			userScore = 0;
			widthValue = 0;
			showQuetions(que_count); //calling showQestions function
			queCounter(que_numb); //passing que_numb value to queCounter
			clearInterval(counter); //clear counter
			clearInterval(counterLine); //clear counterLine
			startTimer(timeValue); //calling startTimer function
			startTimerLine(widthValue); //calling startTimerLine function
			timeText.textContent = "Time Left"; //change the text of timeText to Time Left
			next_btn.classList.remove("show"); //hide the next button
		}
		// if quitQuiz button clicked
	quit_quiz.onclick = () => {
		window.location.reload(); //reload the current window
	}
	const next_btn = document.querySelector("footer .next_btn");
	const bottom_ques_counter = document.querySelector("footer .total_que");
	// if Next Que button clicked
	next_btn.onclick = () => {
			if(que_count < questions[category].length - 1) { //if question count is less than total question length
				que_count++; //increment the que_count value
				que_numb++; //increment the que_numb value
				showQuetions(que_count); //calling show questions function
				queCounter(que_numb); //passing que_numb value to queCounter
				clearInterval(counter); //clear counter
				clearInterval(counterLine); //clear counterLine
				startTimer(timeValue); //calling startTimer function
				startTimerLine(widthValue); //calling startTimerLine function
				timeText.textContent = "Time Left"; //change the timeText to Time Left
				next_btn.classList.remove("show"); //hide the next button
			} else {
				clearInterval(counter); //clear counter
				clearInterval(counterLine); //clear counterLine
				showResult(); //calling showResult function
			}
		}
		// getting questions and options from array
	function showQuetions(index) {
		const que_text = document.querySelector(".que_text");
		//creating a new span and div tag for question and option and passing the value using array index
		let que_tag = '<span>' + questions[category][index].numb + ". " + questions[category][index].question + '</span>';
		let option_tag = '<div class="option"><span>' + questions[category][index].options[0] + '</span></div>' + '<div class="option"><span>' + questions[category][index].options[1] + '</span></div>' + '<div class="option"><span>' + questions[category][index].options[2] + '</span></div>' + '<div class="option"><span>' + questions[category][index].options[3] + '</span></div>';
		que_text.innerHTML = que_tag; //adding new span tag inside que_tag
		option_list.innerHTML = option_tag; //adding new div tag inside option_tag
		const option = option_list.querySelectorAll(".option");
		// set onclick attribute to all available options
		for(i = 0; i < option.length; i++) {
			option[i].setAttribute("onclick", "optionSelected(this)");
		}
	}
	// creating the new div tags which for icons
	let tickIconTag = '<div class="icon tick"><i class="fa fa-check"></i></div>';
	let crossIconTag = '<div class="icon cross"><i class="fa fa-times"></i></div>';
	//if user clicked on option
	function optionSelected(answer) {
		clearInterval(counter); //clear counter
		clearInterval(counterLine); //clear counterLine
		let userAns = answer.textContent; //getting user selected option
		let correcAns = questions[category][que_count].answer; //getting correct answer from array
		const allOptions = option_list.children.length; //getting all option items
		if(userAns == correcAns) { //if user selected option is equal to array's correct answer
			userScore += 1; //upgrading score value with 1
			answer.classList.add("correct"); //adding green color to correct selected option
			answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
			console.log("Correct Answer");
			console.log("Your correct answers = " + userScore);
		} else {
			answer.classList.add("incorrect"); //adding red color to correct selected option
			answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
			console.log("Wrong Answer");
			for(i = 0; i < allOptions; i++) {
				if(option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
					option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
					option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
					console.log("Auto selected correct answer.");
				}
			}
		}
		for(i = 0; i < allOptions; i++) {
			option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
		}
		next_btn.classList.add("show"); //show the next button if user selected any option
	}

	function showResult() {
		info_box.classList.remove("activeInfo"); //hide info box
		quiz_box.classList.remove("activeQuiz"); //hide quiz box
		result_box.classList.add("activeResult"); //show result box
		const scoreText = result_box.querySelector(".score_text");
		if(userScore/questions[category].length >= 0.75) { // if user scored more than 3
			//creating a new span tag and passing the user score number and total question number
			let scoreTag = '<span>Well done! You got <p>' + userScore + '</p> out of <p>' + questions[category].length + '</p></span>';/**<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You have earned ' + userScore + ' reward points!</p>';**/
			scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
			totalPoints += userScore;
			userPoints.innerHTML = parseFloat(totalPoints.toFixed(0));
			Storage.savePoint(totalPoints.toFixed(0));
		} else if(userScore/questions[category].length >= 0.5) { // if user scored more than 1
			let scoreTag = '<span>Nice! You got <p>' + userScore + '</p> out of <p>' + questions[category].length + '</p></span>';
			scoreText.innerHTML = scoreTag;
		} else { // if user scored less than 1
			let scoreTag = '<span>Try again! You got only <p>' + userScore + '</p> out of <p>' + questions[category].length + '</p></span>';
			scoreText.innerHTML = scoreTag;
		}
	}

	function startTimer(time) {
		counter = setInterval(timer, 1000);

		function timer() {
			timeCount.textContent = time; //changing the value of timeCount with time value
			time--; //decrement the time value
			if(time < 9) { //if timer is less than 9
				let addZero = timeCount.textContent;
				timeCount.textContent = "0" + addZero; //add a 0 before time value
			}
			if(time < 0) { //if timer is less than 0
				clearInterval(counter); //clear counter
				timeText.textContent = "Time Off"; //change the time text to time off
				const allOptions = option_list.children.length; //getting all option items
				let correcAns = questions[category][que_count].answer; //getting correct answer from array
				for(i = 0; i < allOptions; i++) {
					if(option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
						option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
						option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
						console.log("Time Off: Auto selected correct answer.");
					}
				}
				for(i = 0; i < allOptions; i++) {
					option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
				}
				next_btn.classList.add("show"); //show the next button if user selected any option
			}
		}
	}

	function startTimerLine(time) {
		counterLine = setInterval(timer, 29);

		function timer() {
			time += 1; //upgrading time value with 1
			time_line.style.width = time + "px"; //increasing width of time_line with px by time value
			if(time > 549) { //if time value is greater than 549
				clearInterval(counterLine); //clear counterLine
			}
		}
	}

	function queCounter(index) {
		//creating a new span tag and passing the question number and total question
		let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions[category].length + '</p> Questions</span>';
		bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
	}
} catch {
	console.log("This page isn't the quiz page, quiz script will not be executed.")
}
//* ---------------------- quiz questions JS ---------------------- *//
// creating an array and passing the number, questions, options, and answers
let questions = {
	airPollution: [{
		numb: 1,
		question: "Which is the most air polluted country?",
		answer: "Bangladesh",
		options: ["Singapore", "Beijing", "Bangladesh", "USA"]
	}, 
	{
		numb: 2,
		question: "What effects of air pollution on the human body?",
		answer: "All of the above",
		options: ["vunerability to infections and diseases", "Damage to reproductive functions", "Increased risk of stroke and dementia", "All of the above"]
	},
	{
		numb: 3,
		question: "What are the major causes of air pollution",
		answer: "All of the above",
		options: ["Combustion of fossil fuels", "Emissions from vehicles", "Deforestation", "All of the above"]
	},
	{
		numb: 4,
		question: "What is an example of a greenhouse gas?",
		answer: "A and B",
		options: ["Carbon Monoxide", "Carbon Dioxide", "Oxygen", "All of the above"]
	},
	{
		numb: 5,
		question: "Which is not a effect of air pollution on the environment?",
		answer: "Ecosystem remains unchanged",
		options: ["Climate Change", "Ozone layer gets damaged", "Ecosystem remains unchanged", "Habitats get destroyed"]
	},
],

	deforestation: [{
		numb: 1,
		question: "What is the estimated annual rate of deforestation?",
		answer: "1.3 million km2 per decade",
		options: ["41.7 million km2 per decade", "1.3 billion km2 per decade", "1.3 million km2 per decade", "6.9 million km2 per decade"]
	}, 
	{
		numb: 2,
		question: "Which forest is considered the 'lungs' of the planet?",
		answer: "The Amazon Rainforest",
		options: ["The Congo Rainforest", "Daintree Rainforest", "The Amazon Rainforest", "Southeast Asian Rainforest"]
	},
	{  
		numb: 3,
		question: "Deforestation is the second leading cause of global warming in the world.",
		answer: "True",
		options: ["True", "False"]
	},
	{
		numb: 4,
		question: "What are the effects of deforestation",
		answer: "All of the above",
		options: ["Climate Change", "Loss of Biodiversity", "Food Insecurity", "All of the above"]
	},
	{
		numb: 5,
		question: "What can be done to stop deforestation?",
		answer: "Plant more trees",
		options: ["Use more paper", "Buy products containing palm oil", "Plant more trees", "All of the above"]
	},
],

	foodWaste: [{
		numb: 1,
		question: "How many tons of food is wasted each year?",
		answer: "1.3 billion tons",
		options: ["50,000 tons", "3 billion tons", "1.3 billion tons", "100,000 tons"]
	}, 
	{  
		numb: 2,
		question: "If we produce food that doesn’t get eaten, what else is wasted?",
		answer: "All of the above",
		options: ["Wildlife Habitats", "Water", "Energy", "All of the above"]
	},
	{
		numb: 3,
		question: "When food waste is sent to landfills, it decomposes to produce what gas more deadly than carbon dioxide?",
		answer: "Methane",
		options: ["Oxygen", "Methane", "Carbon Monoxide", "All of the above"]
	},
	{
		numb: 4,
		question: "What food when wasted, represents the biggest waste of energy?",
		answer: "Beef",
		options: ["Milk", "Poultry", "Corn", "Beef"]
	},
	{
		numb: 5,
		question: "What can be done to prevent food waste?",
		answer: "Donate unsold food",
		options: ["Donate unsold food", "Throw away more food", "Order more take out", "All of the above"]
	},
],
	globalWarming: [{
		numb: 1,
		question: "Air pollution is one of the causes of climate change",
		answer: "True",
		options: ["True", "False"]
	}, 
	{
		numb: 2,
		question: "What is the greenhouse effect?",
		answer: "Gases in the atmosphere trapping heat increasing global temperatures",
		options: ["The name of climate change legislation passed by Congress", "Painting the house green", "Gases in the atmosphere trapping heat increasing global temperatures", "Option 4"]
	},
	{
		numb: 3,
		question: "What are the effects of climate change?",
		answer: "All of the Above",
		options: ["Increase in global temperatures", "Rising sea levels", "Loss in biodiversity", "All of the Above"]
	},
	{
		numb: 4,
		question: "When are sea levels predicted to rise between 1 and 2.3 feet?",
		answer: "2050",
		options: ["2043", "2050", "2078", "2100"]
	},
	{
		numb: 5,
		question: "What can we do to stop climate change?",
		answer: "Walk, cycle or take public transport",
		options: ["Eat less vegetables", "Throw away more food", "Walk, cycle or take public transport", "All of the above"]
	},
],

	lossOfBiodiversity: [{
		numb: 1,
		question: "How does loss of biodiversity affect us?",
		answer: "Decrease our ability to produce medicine",
		options: ["Provides us with more food", "Protects us against natural disasters", "Decrease our ability to produce medicine", "Loss of biodiversity does not affect humans"]
	}, 
	{
		numb: 2,
		question: "Which land-based ecosystem has the most biodiversity",
		answer: "Tropical Rainforests",
		options: ["Deserts", "Tropical Rainforests", "Tundras", "Grasslands"]
	},
	{
		numb: 3,
		question: "What are the causes of loss of biodiversity?",
		answer: "All of the Above",
		options: ["Pollution", "Climate Change", "Human Activity", "All of the Above"]
	},
	{
		numb: 4,
		question: "The status of a 'threatened species' means:",
		answer: "they are likely to become endangered",
		options: ["they are almost extinct", "they are likely to become endangered", "they are extinct", "their numbers are increasing"]
	},
	{
		numb: 5,
		question: "Which of the following is not a type of biodiversity",
		answer: "Individual",
		options: ["Species", "Genetic", "Ecosystem", "Individual"]
	},
],

	plasticPollution: [{
		numb: 1,
		question: "How many million tons of plastic are dumped in our oceans every year?",
		answer: "8 million tons",
		options: ["1 million tons", "8 million tons", "20 million tons", "50 million tons"]
	}, 
	{
		numb: 2,
		question: "Single-use plastic accounts for ___% of the plastic produced each year",
		answer: "40",
		options: ["5", "10", "25", "40"]
	},
	{
		numb: 3,
		question: "What happens to plastic waste left in the environment?",
		answer: "It never fully goes away, it breaks into little pieces",
		options: ["It is biodegradable so it eventually disintegrates", "It never fully goes away, it breaks into little pieces", "There is no such things as plastic waste as they are all recycled"]
	},
	{
		numb: 4,
		question: "Why is plastic dangerous for marine life",
		answer: "All of the above",
		options: ["They mistake it for food and cannot digest it", "They get tangled in it which hinders their movement", "Bacteria on plastic can give coral diseases", "All of the above"]
	},
	{
		numb: 5,
		question: "What can we do to stop plastic pollution?",
		answer: "Bring your own reusable bag",
		options: ["Buy more plastic water bottles", "Order more takeout", "Purchase brand new items", "Bring your own reusable bag"]
	},
],
};
//* ---------------------- end of quiz.html JS ---------------------- *//