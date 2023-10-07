const activecellElement = document.getElementById("active-cell")
const textAlignElements = document.getElementsByClassName("TextAlign");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underlined")
let fontSizeBtn = document.getElementById("fontSize");
let fontFamilyBtn = document.getElementById("fontFamily")
const copyBtn = document.getElementById("copy");
const pasteBtn = document.getElementById("paste");
const cutBtn = document.getElementById("cut");
let activecell = null; // (null,NaN,0,Undifined,false,"") are falsy value..hence always executes else
let activeoptionState;

// function for proper highlighting the options which are used for current focus
function hightlightOptionOnfocus(){

    //checking weather the cell is in bold state or not
    if(activeoptionState.isBold)
    {
     boldButton.classList.add("active-option");    
    }
    else{
        boldButton.classList.remove("active-option")
    }
    // ////////////////////////////////////////////////////////////////////////////

    //checking weather the cell is in italic state or not
    if(activeoptionState.isItalic )
    {
        italicButton.classList.add("active-option"); 
    }
    else{
        italicButton.classList.remove("active-option")
    }

    // ////////////////////////////////////////////////////////////////

    // checking weather underline is selected or not
    if(activeoptionState.isUnderlined )
    {
        underlineButton.classList.add("active-option"); 
    }
    else{
        underlineButton.classList.remove("active-option")
    }

    // ///////////////////////////////////////////////////////////////////////////////////

    // checking text align

    highlightText(activeoptionState.textAlign)
}



// function get triggerd whenever any cell get focused
function onCellFocus(e){
    if(activecell && activecell.id === e.target.id)
    {
        //previously selected cell is equal to the currently selected cell
        return;
    }
    activecell = e.target;
    activecellElement.innerText = e.target.id;

    const ComputedStyle = getComputedStyle(activecell)
    // console.log(ComputedStyle);
activeoptionState ={
        fontFamily : ComputedStyle.fontFamily,
        isBold : ComputedStyle.fontWeight === '600',
        isItalic : ComputedStyle.fontStyle === 'italic', 
        isUnderlined : ComputedStyle.textDecoration.includes('underline'),
        // isUnderlined : ComputedStyle.textDecoration ==='underline',
        textAlign : ComputedStyle.textAlign,
        textColor : ComputedStyle.textColor,
        backgroundColor : ComputedStyle.backgroundColor,
        fontSize: ComputedStyle.fontSize,
    };

    // console.log(activeoptionState);
    hightlightOptionOnfocus();
}

// function get triggered when user clicks on bold btn
function onClickBold(boldButton){
    
    boldButton.classList.toggle("active-option")
   // console.log(activecell);
    if(activecell){
       // console.log(activecell);
        if(activeoptionState.isBold === false){

            activecell.style.fontWeight="600";
            activeoptionState.isBold= true;
        }
        else{
            activecell.style.fontWeight="400"
            activeoptionState.isBold= false;
        }
       
    }
     
}

function onClickItalic(italicButton){

    italicButton.classList.toggle("active-option")
    if(activecell){

        if(activeoptionState.isItalic){

            activecell.style.fontStyle = "normal";
            activeoptionState.isItalic = false;
        }
        else{
            activecell.style.fontStyle = "italic";
            activeoptionState.isItalic = true;

        }
    }
}

function onClickUnderline(underlineButton){

    underlineButton.classList.toggle("active-option")
    if(activecell){
        if(activeoptionState.isUnderlined){
            activecell.style.textDecoration = "none"
        }
        else{
            activecell.style.textDecoration = "underline"
        }
        
    }


}

// function takes textAlign values and decide highlight or not
function highlightText(textAlignValue){
   
    for(let i=0; i<textAlignElements.length; i++)
    {
        if(textAlignElements[i].getAttribute("data-value")===textAlignValue){
            textAlignElements[i].classList.add("active-option")
        }
        else{
            textAlignElements[i].classList.remove("active-option")
        }

    }
}

function onClickTextAlign(textAlignButton){
    let Selectedvalue = textAlignButton.getAttribute("data-value")
    // console.log(Selectedvalue);
    highlightText(Selectedvalue)

    if(activecell){
        activecell.style.textAlign=Selectedvalue;
        activeoptionState.textAlign=Selectedvalue;
    }


}

function onChangetextcolor(textColor){

   let SelectedColor = textColor.value;
//    console.log(SelectedColor);
   if(activecell)
   {
    activecell.style.color = SelectedColor;
    activeoptionState.color = SelectedColor;
   }

}

function onChangeBackgroundcolor(backgroundColor){

    let SelectedColor = backgroundColor.value;
    // console.log(SelectedColor);
    if(activecell)
    {
        
     activecell.style.backgroundColor = SelectedColor;
     activeoptionState.backgroundColor = SelectedColor;
    }
 
 }


 fontSizeBtn.addEventListener('change',function(){
    const selectedfontsize = fontSizeBtn.value;
   // console.log(selectedfontsize);
   if(activecell){

       activecell.style.fontSize = selectedfontsize + 'px';
       activeoptionState.fontSize = selectedfontsize + 'px';
   }
  
 })


 fontFamilyBtn.addEventListener('change',function(){
    const selectedfontfamily = fontFamilyBtn.value;
    //console.log(selectedfontsize);
    activecell.style.fontFamily = selectedfontfamily;
    activeoptionState.fontFamily = selectedfontfamily;
 })
//  //////////////////////////////////////////////////////////////////////////////////

let copytext = "";
let cutText = "";

copyBtn.addEventListener('click',(e)=>{
  if(activecell){
    copytext = activecell.innerText;
    console.log(activecell.innerText);
  }
})

pasteBtn.addEventListener('click', ()=>{
  if(activecell){
    activecell.innerText = copytext;
    if(cutText !== ""){
      activecell.innerText = cutText;
      cutText = "";
    }
  }
})

cutBtn.addEventListener('click', ()=>{
  if(activecell){
    cutText = activecell.innerText;
    activecell.innerText = "";
  }
})
