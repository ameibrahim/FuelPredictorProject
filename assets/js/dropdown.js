let dropdowns = document.querySelectorAll(".dropdown");
let zIndex = 1;

dropdowns.forEach( dropdown => {

    let isDropdownOpen = false;
    let values = dropdown.querySelectorAll(".values > li");

    dropdown.addEventListener("click", () => {
        
        if(isDropdownOpen){
            dropdown.className = "dropdown";
        }
        else{
            dropdown.className = "dropdown open";
        }

        dropdown.style.zIndex = zIndex++ + 1;

        isDropdownOpen = !isDropdownOpen;
    });

    values.forEach( value => {
        value.addEventListener("click", () => {
            dropdown.setAttribute("data-value",value.textContent);
            dropdown.setAttribute("data-empty","false");
        });
    });

});

// function getZIndex() { return zIndex++ };