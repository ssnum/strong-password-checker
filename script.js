//define variables
let count = 0;
let symbolCount=0;
let numberCount =0;
let shortest;
let failedAttempts = [];
let length = 0;

document.getElementById("eyeButton").addEventListener("click",togglePassword);
//when button is clicked, we run function a
btn.addEventListener("click", a);
randomBtn.addEventListener("click", randomPassword);


function createPassword(x){
  
  
  //Reset variables to 0
  count = 0;
  symbolCount=0;
  numberCount =0;
  
  //length equals the number of characters in the string parameter x 
  length = x.length;


  
  //i will cycle through all the index numbers of x (all the characters of x)
  for (let i=0; i<=x.length-1; i++){
 // checks if each character is one of the listed symbols and adds one to symbolCount if it is   
     if ((x[i])== "!" || (x[i])== "@" || (x[i])== "#"|| (x[i])== "$"||(x[i])== "%"||(x[i])== "^"||(x[i])== "&"||(x[i])== "*"||(x[i])== "("||(x[i])== ")"){
       symbolCount++;
     }
      }


    //if the character is uppercase, add one to count
   var upperchar = Boolean(x.match(/[A-Z]/));
     if (upperchar==true){
         count++;
       }
    
  

//cycle through all the index numbers of x (all characters in x)
  for (let i=0; i<=x.length-1;i++){
    //checks if each character is one of the listed numbers and adds one to numberCount if it is
    if (x[i]=="1"||x[i]=="2"||x[i]=="3"||x[i]=="4"||x[i]=="5"||x[i]=="6"||x[i]=="7"||x[i]=="8"||x[i]=="9"||x[i]=="0"){
      numberCount++;
    }
  }

  //if there are less than 10 characters in x
  if (length <10){
    //add failed attempt x to the array holding all failed attempts 
    failedAttempts.push(x+"");

  }
  //if count (which adds one every time there is a capital letter), is 0 (meaning there are no capital letters)
  else if (count==0){
    // add failed attempt to the array 
     failedAttempts.push(x+"");
  }
  //if symbolCount (which adds one every time there is a symbol), is 0 (meaning there are no symbols used)
  else if (symbolCount==0){
    // add failed attempt to the array 
     failedAttempts.push(x+"");
  }
  else if (numberCount==0){
    //add failed attempt to the array
    failedAttempts.push(x+"");
  }


   //sets the shortest failed attempt to equal the first index automatically (will be changed later)
   shortest = x;
  //i cycles through all the indexes in the failedAttempts array
  for (i=0; i<failedAttempts.length; i++){
    //if tne length of the current failed attempt is less than the length of the shortest failed attempt, set the shortest failed attempt to equal the current failed attempt
    if (failedAttempts[i].length<=shortest.length){
      shortest = failedAttempts[i];
    }
    
  }

  //change color of text to green if there is a capital letter
  if (count!=0){
    document.getElementById("instructions_Ca").style.color="green";
  }
  // else (meaning no capital letter) make it red
  else {
    document.getElementById("instructions_Ca").style.color="red";
  }
  // change color of text to green if there is a symbol
  if (symbolCount!=0){
    document.getElementById("instructions_S").style.color="green";
  }
    // else (meaning no symbol) make it red
  else {
    document.getElementById("instructions_S").style.color="red";
  }
  // change color of text to red if the length is less than 10
  if (length<10){
    document.getElementById("instructions_Ch").style.color="red";
  }
    // if the length is greater than 10 change color of text to green
  else if (length>=10) {
    document.getElementById("instructions_Ch").style.color="green";
  }
  if (numberCount!=0){
    document.getElementById("instructions_N").style.color="green";
  }
    // else (meaning no symbol) make it red
  else {
    document.getElementById("instructions_N").style.color="red";
  }


    // if all the requirements are met to have a strong password print the failed attempts, shortest attempt, and final password along with a congratulations message

  if (numberCount!=0 &&symbolCount!=0 && length>=10 &&count!=0)
  {
    document.getElementById("result_info").innerHTML= "Congrats!" ;
    document.getElementById("result_failedattempt").innerHTML= "Failed attempts: "+failedAttempts;
    if(failedAttempts.length==0){
      document.getElementById("result_failedattempt").innerHTML = "Failed attempts: 0";
    }
    document.getElementById("result_shortestattempt").innerHTML= "Shortest failed attempt: "+shortest ;
    document.getElementById("result_passwd").innerHTML= "Password set to: "+x ;
      
  }
  else
  {
    document.getElementById("result_info").innerHTML= " " ;
    document.getElementById("result_failedattempt").innerHTML= " ";
    document.getElementById("result_shortestattempt").innerHTML= "" ;
    document.getElementById("result_passwd").innerHTML= " ";
  }


  strengthMeter();
  
}


//define function a
function a(){
  //call function createPassword with the parameter of the user's password input
  createPassword(password.value);
}


/*
 Create random password function. It uses random number generators to create a random password.
 The length of password generated is between 10-20 characters

*/
function randomPassword(){
  //define variables for symbols and letters 
  const symbols = "!@#$%^&*()";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //create a random password length between 10-20
  const passwordLength = Math.floor(Math.random()*(10)+10);
  

  //one giant string of all possible characters to fill space once the basic requirements are there 
  const allChars = symbols + lowercaseLetters+uppercaseLetters;

//define password
  let password = "";

  //create random index numbers to get random characters
  var rnum_s= Math.floor(Math.random()*symbols.length);
  var rnum_l= Math.floor(Math.random()*uppercaseLetters.length);

  // add random character from strings using the randomly generated index number
  password+= symbols.substring(rnum_s, rnum_s+1);
  password+= symbols.substring(rnum_l, rnum_l+1);

  //fill in extra spots with random characters from the big string 
  for (let i=0; i<passwordLength-2; i++){
    var rnum = Math.floor(Math.random()*allChars.length);
    password+= allChars.substring(rnum, rnum+1);
  }

  //shuffle password characters
  password = password.split("").sort(()=> Math.random()-.5).join("");

  //return random password
  document.getElementById("randomPassword").innerHTML = "Your Generated Password is "+password+"!";
}

/*
Strength meter checks how many of the initial requirements have been met by the password entered by the user. Based on how much of the criteria has been completed, it moves the progress bar from the red section towards the green section.

*/
function strengthMeter (){
  //create variable for how many reqiurements are completed 
  let requirements_Completed =0;
  //for each of the requirements add one to the variable if the requirement is completed
  
  if (length>=10){
    requirements_Completed++;
  }
  if(count>=1){

    requirements_Completed++;
  }
  if(symbolCount>=1){

    requirements_Completed++;
   
  } 
  if( numberCount>=1){

    requirements_Completed++;
  }

  // based on how many criteria are met, moved the pointer accordingly to the right (different percents show the percent of the div that the pointer is being moved to (33 percent per color))

  if(requirements_Completed<1){
    //0 requirements completed, 5 percent to the right

    document.getElementById("pointer").style.left="5%";

  }
  if(requirements_Completed==1){
    //one requirements completed, 18 percent to the right

    document.getElementById("pointer").style.left="18%";

  }
  if(requirements_Completed==2){
    //two requirements completed, 25 percent to the right
    document.getElementById("pointer").style.left="25%";
  
  }
   if(requirements_Completed==3){
     //three requirements completed, 65 percent to the progress bar
      document.getElementById("pointer").style.left="65%";

    }
  if(requirements_Completed==4){
    //all requirements completed, 95 percent to the right

    document.getElementById("pointer").style.left="95%";

  }
}

//togglePassword acts on an event(the eye icon being clicked) and changes the user's input to dots to hide and changes it back to show the password based on what they currently have. 
function togglePassword(event){
  event.preventDefault();
  //save inputField as the input element from id password
  var inputField = document.getElementById("password");
  // if the type of input is not the dots, change it to the dogs
  if(inputField.type!="password"){
    inputField.setAttribute("type","password");
  }
    //else make it the text
  else{
    inputField.setAttribute("type","text");

  }

}
