window.onload = function(){
    gameController.setGetWordList();
    gameController.makeCatButtons();
}

///
///
///

const gameController = {
    //This is the game controller object it manages most of the game
    blanks : [],
    word : "",
    letter : "",
    lives : 6,
    wordList : [],
    score : 0,
    buildGame : function(cat){
        //This function is run at the start of the program to begin a game
        document.querySelector("#categoryButtons").classList.add("hidden");
        document.querySelector("#gameDiv").classList.remove("hidden");
        this.setCategory(cat)
        this.setWord();
        this.buildLetterButtons();
        this.makeButtonEvents();
        console.log()
        this.makeBlanks();
        this.makeWord();
    },
    setGetWordList : function(){
        let xhr = new XMLHttpRequest;
        let url = "vocabularies.json"
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ){
                let temp = JSON.parse(xhr.responseText)
                gameController.fileData = temp.vocabularies;
            }
                
        }
        xhr.open("GET", url, false);
        xhr.send();
    },
    makeCatButtons : function(){
        cat = document.querySelector("#categoryButtons")
        for (let i=0; i< this.fileData.length; i++){
            cat.innerHTML += "<button id = \"cat" + this.fileData[i].categoryName + "\" value = \"" + this.fileData[i].categoryName + "\">" + this.fileData[i].categoryName + "</button>";
        }
        let cats = document.querySelectorAll("#categoryButtons *");
        for (let i=0; i<cats.length; i++)
            document.querySelector("#" + cats[i].id).addEventListener("click", el => {this.buildGame(el.target.id)})
    },
    setCategory : function(cat){
        console.log (this.fileData)
        for (let i=0; i< this.fileData.length; i++){
            if (this.fileData[i].categoryName === cat)
                this.wordList = this.fileData[i].words;
        }
    },
    setWord : function(){
        this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)]
    },
    setLetter : function(letter){
        this.letter = letter;
    },
    buildLetterButtons : function(){
        //This function builds all the buttons used to select letters
        let buttonPlace = document.querySelector("#buttons");
        buttonPlace.innerHTML = "";
        for (let i=65; i<=90; i++)
            buttonPlace.innerHTML += "<button value=\"" + String.fromCharCode(i) + "\" class=\"button\" id = \"btn" + String.fromCharCode(i) +"\">"+ String.fromCharCode(i) + "</button>"
    },
    makeButtonEvents : function(){
        let buttons = document.querySelectorAll(".button");
        for (let i=0; i<buttons.length; i++)
            document.querySelector("#" + buttons[i].id).addEventListener("click", el => {this.setLetter(el.target.value); this.testLetter(el)}, {once : true})
    },
    makeBlanks : function(){
        this.blanks = [];
        for (let i = 0; i<this.word.length; i++)
            this.blanks.push("_")
    },
    testLetter : function(el){
        //This function does all the checks to see if a letter is in the word and then checks if the game is over
        let indexes = [];
        for (let i = 0; i < this.word.length; i++)
            if (this.letter == String(this.word[i]).toUpperCase()) indexes.push(i);
        if (indexes.length != 0){
            this.changeLetter(indexes);
            el.target.classList.add("green");
            el.target.disabled = true;
        } 
        else{
            this.lives -= 1;
            if (this.lives < 0)this.lives = 0;
            el.target.classList.add("red");
            el.target.disabled = true;
        } 
        this.gameState();
    },
    changeLetter : function(indexes){
        //This changes the letter in blanks based off the indexes

        this.score += indexes.length;

        for(let i = 0; i<indexes.length; i++)
            this.blanks[indexes[i]] = this.letter
        this.makeWord()
    },
    makeWord : function(){
        //This makes the blanks visible to the player
        let wordSpace = document.querySelector("#letters");
        let htmlString = "";
        for(let i = 0; i<this.blanks.length; i++)
            htmlString += "<div><h2>" + this.blanks[i] + "</h2></div>";
        wordSpace.innerHTML = htmlString;  
        document.querySelector("style").innerHTML = "#letters{grid-template-columns: repeat("+(this.blanks.length) + ", 1fr);}"
    }, 
    gameState : function(){
        if (!(this.blanks.includes("_"))) this.winGame();   
        if (this.lives <= 0) this.loseGame();
    },
    winGame : function() {
        //TODO What happens end of game when you win
        console.log("done");
    },
    loseGame : function(){
        //TODO What happens end of game when you lose
        console.log("lose")
    },
    gameEnd : function(){
        //TODO what happens end of game regardless of result
    },
    setScore : function(){
        this.score += this.lives - 6;
    }
}

///
///
///

const serverStuff = {
    dataReturned:"",
    sendData : function(url, lst){
        let args = "";
        for (let i = 65; i<lst.length + 65; i++){
            args += String.fromCharCode(i) + "=" + lst[i-65];
            if (i - 65 != lst.length-1)
                args+="&";
        }
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                this.dataReturned = xhr.responseText;                     
            }
        }
        xhr.open("GET", url+"?"+args, true);
        xhr.send();        
    }

}

///
///
///

const pageEvents = {
    SignupSwitchState : function(){
        console.log("clicked")  
    document.querySelector("#Login").classList.add("hidden")
    document.querySelector("#SignUp").classList.remove("hidden")
    },
    signupUserAccount : function(){
        console.log("I Clicked")
        //username_Field_SignUp     
        //password_Field_SignUp
        //Conf_password_Field_SignUp
        let signupUser = document.querySelector("#username_Field_SignUp").value
        let SignupPass = document.querySelector("#password_Field_SignUp").value
        let SignupPassConf = document.querySelector("#Conf_password_Field_SignUp").value
        if ((SignupPass && SignupPassConf) == false){
            alert("Passwords Dont Match");
        } else{
            sendData("createUser.php",[signupUser,SignupPass]);
        }
    },
    updateLeaderboard : function(){
        //Unfinished???
        let lb = document.querySelector("#leaderboard");
        lb.innerHTML = "<table><tr><th>Name</th><th>Score</th></tr>";
        lb.innerHTML += this.dataReturned + "</table>";
    },
}