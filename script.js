//Declaring important variables
const numbers = document.querySelectorAll('.number');
const operbutton = document.querySelectorAll('.operation');
const eqbutton = document.querySelector('.equals');
const acbutton = document.querySelector('.allclear');
const delbutton = document.querySelector('.delete');
const prevopText = document.querySelector('.prevop');
const curropText = document.querySelector('.currop');

//Class for storing the variables while using the calculator
class Calculator{
    constructor(prevopText,curropText){
        this.prevopText=prevopText;
        this.curropText=curropText;
        this.clear();
    }
    clear(){
        this.prevop='';
        this.currop='';
        this.operation=undefined;
    }
    delete(){
        this.currop=this.currop.toString().slice(0,-1);
    }
    appendNum(number){
        if(number==='.' && this.currop.includes('.')){
            return
        }
        this.currop=this.currop.toString() + number.toString();
    }
    chooseOp(operation){
        if(this.currop==='') return
        if(this.prevop!==''){
            this.calculate()
        }
        this.operation= operation;
        this.prevop= this.currop;
        this.currop='';
    }
    calculate(){
        let result;
        const prev = parseFloat(this.prevop);
        const curr = parseFloat(this.currop);
        if(isNaN(prev)||isNaN(curr)) return;
        switch(this.operation){
            case '+': 
                result= prev+curr;
                break;
            case '-':
                result = prev-curr;
                break;
            case '*':
                result = prev*curr;
                break;
            case '÷':
                if(curr==0){
                    alert("ERROR\nCan't divide by 0\nDumbass, Hit AC to reset")
                    this.clear();
                    this.updateDisplay();
                    break;
                }
                else{
                    result = prev/curr;
                    break;
                }    
            default:
                return;
        }
        this.currop=result;
        this.operation=undefined;
        this.prevop='';
    }
    updateDisplay(){
        this.curropText.textContent = this.getDisplayNum(this.currop);
        if(this.operation!=null){
            this.prevopText.textContent = `${this.getDisplayNum(this.prevop)} ${this.operation}`;
        }
        else{
            this.prevopText.textContent='';
        }
    }
    //Helper function
    getDisplayNum(number){
        let stringNum = number.toString();
        let integerDigit = parseFloat(stringNum.split('.')[0])
        let decimalDigit = stringNum.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigit)){
            integerDisplay='';
        }
        else {
            integerDisplay= integerDigit.toLocaleString('en', { maximumFractionDigits:0});
        }
        if(decimalDigit!=null){
            return `${integerDisplay}.${decimalDigit}`;
        }
        else{
            return integerDisplay;
        }
    }
}
//initialising new calculator
const calci = new Calculator(prevopText,curropText);

//Event Listeners
numbers.forEach(button => {
    button.addEventListener('click',()=>{
        calci.appendNum(button.textContent);
        calci.updateDisplay();
    })
})
operbutton.forEach(button =>{
    button.addEventListener('click',()=>{
        calci.chooseOp(button.textContent);
        calci.updateDisplay();
    })
})
eqbutton.addEventListener("click",()=>{
    calci.calculate();
    calci.updateDisplay();
})
acbutton.addEventListener("click",()=>{
    calci.clear();
    calci.updateDisplay();
})
delbutton.addEventListener("click",()=>{
    calci.delete();
    calci.updateDisplay();
})
window.addEventListener("keydown",handleKeyPress);
function handleKeyPress(e){
    e.preventDefault();
    if((e.key>=0 && e.key <=9)||(e.key==='.')){
        calci.appendNum(e.key);
        calci.updateDisplay();
    }
    if(e.key === "Enter" ||(e.key === "=" && currop != "" && prevop != "")) {
        calci.calculate();
        calci.updateDisplay();
    }
    if (e.key === "+") {
        calci.operation=(e.key);
        calci.chooseOp(e.key);
        calci.updateDisplay();
    }
    if(e.key === "/"){
        calci.operation=('÷');
        calci.chooseOp('÷');
        calci.updateDisplay();
    }
    if(e.key === "-"){
        calci.operation=(e.key);
        calci.chooseOp(e.key);
        calci.updateDisplay(); 
    }
    if (e.key === "*") {
        calci.operation=(e.key);
        calci.chooseOp(e.key);
        calci.updateDisplay();
    }
    if (e.key === "Backspace") {
        calci.delete();
        calci.updateDisplay();
    }
}
