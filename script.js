const inputSlider =document.querySelector("[data-lengthSlider]");
const lengthDisplay =document.querySelector(".passwordNo");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn =document.querySelector("[ data-copyBtn]");
const copyMsg =document.querySelector("[ data-copyMsg]");

const uppercaseCheck =document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn =document.querySelector("[data-generatePassword]");

const allCheckBox =document.querySelectorAll("input[type=checkbox]");

const leftImg = document.querySelector("#leftImg");

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("grey");

const symbols= ' !@#$%^&*():"{}.,-+[];=+*-~?/';



//set passwordLength
function handleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerText=passwordLength;

    inputSlider.style.backgroundSize= (passwordLength*100/20) + "% 100%";
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = ` 0px 0px 12px 1px ${color}`;
}

function getRndInt(min,max){
return Math.floor(Math.random()*(max-min))+min;
}

function generateNumber(){
    return getRndInt(0,9);
}

function generateUppercase(){
    return String.fromCharCode( getRndInt(65,91));
}

function generateLowercase(){
    return String.fromCharCode( getRndInt(97,123));
}

function generateSymbol(){
    const rnd= getRndInt(0, symbols.length);
    return symbols.charAt(rnd);
}

function shufflePassword(array){
   for(let i= array.length-1;i<0;i--){
    const j =Math.floor(Math.random()*(i+1));
    const temp=array[j];
    array[j]=temp;
   }
   let str="";
   array.forEach((el) => (str+=el));
   return str;
}

function calcStrenght(){
    let hasUpper =false;
    let hasLower =false;
    let hasNum =false;
    let hasSym =false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;
    
    if(hasUpper && hasLower && hasNum && hasSym  && passwordLength>=8)
        {
            setIndicator("green");
        }
    else if((hasUpper || hasLower )&& (hasNum || hasSym )
        && passwordLength>=6)
        {
            setIndicator("lightgreen");
        }    
    else{
        setIndicator("Red");
    }
}

async function copyContent(){
    try{
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
  copyMsg.classList.add("active");
setTimeout(
    () =>{
  copyMsg.classList.remove("active");},2000);
}



function handleCheckBoxChange (){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    })

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change' , handleCheckBoxChange);
})

inputSlider.addEventListener('input' , (e) => {
    passwordLength=e.target.value;
    handleSlider();

    if (e.target.value<10){
         leftImg.src="assets/Password-Generator-1.svg";
    }
    else if(e.target.value>=10 && e.target.value<=15){
        leftImg.src="assets/Password-Generator-4.svg";
    }
    else{ leftImg.src="assets/Password-Generator-5.svg";}
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () =>{
  //none of the checkbox are selected 
  if(checkCount<=0){
    password="";
    passwordDisplay.value=password;
    return;   }

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";

    let funcArr=[];
    
    if(uppercaseCheck.checked)
        funcArr.push(generateUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowercase);

    if(numbersCheck.checked)
        funcArr.push(generateNumber);
    
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);


    //compulsary addition 

 for(let i=0; i<funcArr.length; i++){
    password+=funcArr[i]();
 }

 // remaining addition 
 for(let i=0; i<passwordLength-funcArr.length; i++){
    let rndIndex= getRndInt(0, funcArr.length);

    password+=funcArr[rndIndex]();
 }

 //suffle the password
 password= shufflePassword(Array.from(password));

 //show in UI
 passwordDisplay.value=password;

 // calculate strength
 calcStrenght();
});

 
