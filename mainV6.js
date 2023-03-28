window.onload = function(){
    gameController.setGetWordList();
    gameController.makeCatButtons();
    //Event Listners
       
    document.querySelector("#loginBut").addEventListener("click",serverStuff.LogintoAccount)
    document.querySelector("#SignupBut").addEventListener("click",serverStuff.SignupUseraccount)
    document.querySelector("#SignUp_A_Tag").addEventListener("click",pageEvents.SignupSwitchState)
    document.querySelector("#LogIn_A_tag").addEventListener("click",pageEvents.LoginSwitchState)
    document.querySelector("#GuestBut").addEventListener("click",pageEvents.GuestLogin)
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
    cat : "",
    buildGame : function(){
        //This function is run at the start of the program to begin a game
        document.querySelector("#categoryButtons").classList.add("hidden");
        document.querySelector("#gameDiv").classList.remove("hidden");
        this.setCategory()
        this.setWord();
        this.buildLetterButtons();
        this.makeButtonEvents();
        console.log()
        this.makeBlanks();
        this.makeWord();
        document.querySelector("#playAgain").addEventListener("click", function(){
            document.querySelector("#categoryButtons").classList.remove("hidden");
            document.querySelector("#gameDiv").classList.add("hidden");
            gameController.makeCatButtons()})
        this.score = 0;
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
        let cat = document.querySelector("#categoryButtons")
        cat.innerHTML = "";
        for (let i=0; i< this.fileData.length; i++){
            cat.innerHTML += "<button id = \"cat" + this.fileData[i].categoryName + "\" value = \"" + this.fileData[i].categoryName + "\">" + this.fileData[i].categoryName + "</button>";
        }
        let cats = document.querySelectorAll("#categoryButtons *");
        for (let i=0; i<cats.length; i++)
            document.querySelector("#" + cats[i].id).addEventListener("click", el => {this.cat = el.target.value; this.buildGame()})
    },
    setCategory : function(cat){
        for (let i=0; i< this.fileData.length; i++){
            if (this.fileData[i].categoryName === this.cat)
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
        document.querySelector("style").innerHTML += "#letters{grid-template-columns: repeat("+(this.blanks.length) + ", 1fr);}"
    }, 
    gameState : function(){
        if (!(this.blanks.includes("_"))) this.winGame();   
        if (this.lives <= 0) this.loseGame();
    },
    winGame : function() {
        //TODO What happens end of game when you win
        alert("Congratulations your score is " + this.score);
        this.gameEnd();
        if (pageEvents.logState != 0) {
        serverStuff.insertIntoRecord();
        }
    },
    loseGame : function(){
        //TODO What happens end of game when you lose
        alert("Better luck next time");
        this.score = 0;
        this.gameEnd();
    },
    gameEnd : function(){
        //TODO what happens end of game regardless of result
        let buttons = document.querySelectorAll(".button");
        for (let i=0; i<buttons.length; i++)
            document.querySelector("#" + buttons[i].id).disabled = true;
    },
    setScore : function(){
        this.score += this.lives - 6;
    }
}

const serverStuff = {
    dataReturned:"",
    SignupUseraccount : function(){
        let signupUser = document.querySelector("#username_Field_SignUp").value
        let SignupPass = document.querySelector("#password_Field_SignUp").value
        let SignupPassConf = document.querySelector("#Conf_password_Field_SignUp").value
        if ((SignupPass == SignupPassConf) == false){
            alert("Passwords Dont Match");
        } else{
            serverStuff.sendData("createUser.php",[signupUser,SignupPass]);
            pageEvents.logState = Number(serverStuff.dataReturned)
            switch (pageEvents.logState){
                case 0:
                    break;
                case 1:
                    pageEvents.userName = signupUser;
                    document.querySelector("#SignUp").classList.add("hidden")
                    document.querySelector("#usernameField").innerHTML = signupUser;
                    break;
                case 3:
                    alert(signupUser + " already exists");
                    break;
            }
        }
        
    },
    LogintoAccount : function(){
        let user = document.querySelector("#username_Field_Login").value;
            
        let pass = document.querySelector("#password_Field_Login").value;
        
        let list = [user,pass]
        serverStuff.sendData("LoginUser.php",list)
        pageEvents.logState = Number(serverStuff.dataReturned);

        switch (pageEvents.logState){
            case 0:
                break;
            case 1:
                pageEvents.userName = user;
                document.querySelector("#Login").classList.add("hidden")
                document.querySelector("#usernameField").innerHTML = user;
                break;
            case 2:
                alert("Password Incorrect");
                break;
            case 3:
                alert(user + " does not exist");
                break;
        }

    },
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
                serverStuff.dataReturned = xhr.responseText;     
                               
            }
        }
        xhr.open("GET", url+"?"+args, false);
        xhr.send();        
    },
    insertIntoRecord : function(){
        data = [pageEvents.userName, gameController.score,gameController.cat, gameController.word, gameController.lives]
        serverStuff.sendData("leaderboard.php", data)
    }

}

const pageEvents = {
    userName : "",
    logState : 0,
    // State 0 guest

    // State 1 Success
    // State 2 Passowrd Error
    // State 3 Does not exist

    // State 1 Success
    // State 2 Passwords dont match
    // State 3 Accounts exists

    loginState : function(){
        document.querySelector("#Login").classList.remove("hidden")
    },
    SignupSwitchState : function(){
        document.querySelector("#Login").classList.add("hidden")
        document.querySelector("#SignUp").classList.remove("hidden")
    },
    LoginSwitchState : function(){
        document.querySelector("#Signup").classList.add("hidden")
        document.querySelector("#Login").classList.remove("hidden")
    },
    GuestLogin : function(){
        document.querySelector("#Login").classList.add("hidden")
        document.querySelector("#usernameField").innerHTML = "GUEST";
    }
}
