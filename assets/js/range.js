function bindValue(element){

    let rangeElement = element.querySelector("input");
    let tag = element.querySelector("span");
    let value = rangeElement.value;
    tag.textContent = value; 

}

function resetRangeElement(element){

    let parentElement = element.parentElement;
    let tag = parentElement.querySelector("span");
    let minimum = element.min;
    console.log("min: ", minimum);
    element.value = minimum;
    tag.textContent = minimum; 

}