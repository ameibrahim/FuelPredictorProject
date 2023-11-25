function bindValue(element){

    let rangeElement = element.querySelector("input");
    let tag = element.querySelector("span");
    let value = rangeElement.value;
    tag.textContent = value; 
    console.log(value)

}