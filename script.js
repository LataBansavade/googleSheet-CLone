const header = document.getElementById("header");
const body = document.getElementById("body");

// we have to create header which consisting of A,B,C,D..... 26 columns(bold elements)
// in single row and append it into header
// we use 65 to 90 for easily convert this number to characters(Ascii values A to Z)
for(let i=65; i<=90; i++)
{
    let char = String.fromCharCode(i);
    const bold = document.createElement("b");
    bold.innerText = char;
    header.appendChild(bold);
}


// we have to create each row and append in to its body row wich have 27 columns
// first col is of sr number and rest are empty 

function createRowandAppend(rowNumber){

    const row = document.createElement("div");
    row.className ="row";
    for(let i=64; i<=90; i++)
    {
        if(i=== 64)
        {
            const b = document.createElement("b");
            b.innerText = rowNumber;
            row.appendChild(b);
        }
        // during creating each empty cell we have given a dynamic id to it and added 
        // eventlistener called focus whenever user make focus on perticular cell
        // we have to show the cell on which he is focusing
        else{
            const cell = document.createElement("div");
            cell.id = `${String.fromCharCode(i)}${rowNumber}`
            cell.contentEditable=true;
            cell.addEventListener("focus",onCellFocus);
            row.appendChild(cell);
        }
    }
    body.appendChild(row)
}

// we have to create 100 rows so call above function 100 times
for(let i=1; i<=100; i++)
{
    createRowandAppend(i);
}
