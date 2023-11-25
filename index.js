let viewContainer = document.querySelector(".user-credentials-view");
let imageView = document.querySelector(".image-view");
let dashboard = document.querySelector(".dashboard");
let dashboardLoader = document.querySelector(".dashboard-loader");
let userActions =document.querySelector(".user-actions");
let loginContainer = document.querySelector(".login-container")
let signupContainer = document.querySelector(".signup-container")
let mapView = document.querySelector(".map-view-container")
let carOverlay = document.querySelector(".car-overlay");

if(USERNAME != ""){
    showUsername(USERNAME);
    maximize();
}

function AJAXCall(callObject){

    let {
        phpFilePath,
        rejectMessage,
        params,
        type,
    } = callObject;

    return new Promise((resolve,reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open("POST", phpFilePath, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function(){
            if( this.status == 200 ){

                let result = type == "fetch" ? 
                JSON.parse(this.responseText) : this.responseText ;

                //TODO: Take a look one more time
                if(result.length < 1 && type != "fetch") reject(rejectMessage || "SQLError");
                else { resolve(result) }
            }
            else{
                reject("Error With PHP Script");
            }
        }

        xhr.send(params);

    });
    
}

function showUsername(username){
    let placeholder = document.querySelector(".username");
    placeholder.textContent = username;
}

function showLogin(){
    loginContainer.style.display = "grid";
    signupContainer.style.display = "none";
}

function showSignup(){
    signupContainer.style.display = "grid";
    loginContainer.style.display = "none";
}

async function logout(){

    let callObject = {
        phpFilePath: "include/logout-script.php",
        rejectMessage: "oooops",
        params: "",
        type: "post",
    }

    try {
        let result = await AJAXCall(callObject);
        console.log(result);
    }
    catch(error){
        console.log(error);
    }


    minimize();
}

function minimize(){

    viewContainer.style.width = "500px";
    viewContainer.style.boxShadow = "0px 0px 200px var(--accent)";

    dashboard.style.display = "none";
    userActions.style.display = "none";

    imageView.style.left = "0px";
    viewContainer.style.top = "0px";
    viewContainer.style.left = "calc(100vw - 500px)";

    loginContainer.style.display = "grid";
    loginContainer.style.transform = "scale(0)";
    signupContainer.style.display = "none";

    setTimeout(() => {
        loginContainer.style.transform = "scale(1)";
    }, 200)

}

function maximize(){
    viewContainer.style.width = "100vw";
    viewContainer.style.boxShadow = "unset";
    // viewContainer.style.position = "absolute";

    imageView.style.left = "calc(-100vw + 500px)";
    viewContainer.style.top = "0px";
    viewContainer.style.left = "0px";

    loginContainer.style.display = "none";
    signupContainer.style.display = "none";

    // show loader 2s
    dashboardLoader.style.display = "flex";

    setTimeout(() => {
        dashboardLoader.style.display = "none";
        dashboard.style.display = "grid";
        userActions.style.display = "grid";
    }, 2000)
}

async function login() {

    let loginButton = document.querySelector(".login-button");
    let loginLoader = loginButton.querySelector(".button-loader");
    let buttonText = loginButton.querySelector("p");

    buttonText.style.display = "none";
    loginLoader.style.display = "flex";

    // REGEX Inputs
    let username = document.querySelector(".login-username-field").value;
    let password = document.querySelector(".login-password-field").value;

    let params = `username=${username}&&`+`password=${password}`;

    let callObject = {
        phpFilePath: "include/login-script.php",
        rejectMessage: "shoot",
        params,
        type: "post",
    }

    try {

        let result = await AJAXCall(callObject)

        console.log(result);

        if( result == "success" ){
            setTimeout(() => {
                maximize();
                showUsername(username);
                buttonText.style.display = "block";
                loginLoader.style.display = "none";
            }, 2000);
        }
        else {
            // showWrongCredentialsWarning();
            setTimeout(() => {
                buttonText.style.display = "block";
                loginLoader.style.display = "none";
            }, 1300);
        }

    }
    catch(error){
        console.log((error));
    }

}

function predict(element){

    mapView.style.left = "0vw";
    viewContainer.style.left = "-100vw";

}

function slideOutMapView(){
    mapView.style.left = "100vw";
    viewContainer.style.left = "0vw";
}

function showAddCarOverlay(){
    carOverlay.style.display = "grid";
}

function closeAddCarOverlay(){
    carOverlay.style.display = "none";
}

async function addCar(element){
    let text = element.querySelector("p");
    let loader = element.querySelector(".button-loader");

    text.style.display = "none";
    loader.style.display = "flex";

    let details = getCarDetails();
    
    try {
        console.log(details);
        let result = await sendCarDetails(details);
        console.log("result: ", result);

        //TODO: resetFormAndLoadingButton()
    }
    catch(error){
        console.log(error);
    }

    setTimeout(() => {
        text.style.display = "none";
        loader.style.display = "flex";
        closeAddCarOverlay();
        // refreshDashboard();
    }, 3000);
}

function getCarDetails() {

    let carNameInput = carOverlay.querySelector("#car-name-input");
    let vehicleClassInput = carOverlay.querySelector("#vehicle-class-input");
    let engineSizeInput = carOverlay.querySelector("#engine-size-input");
    let cylindersInput = carOverlay.querySelector("#cylinders-input");
    let transmissionInput = carOverlay.querySelector("#transmission-input");
    let CO2RatingInput = carOverlay.querySelector("#co2-rating-input");
    let fuelTypeInput = carOverlay.querySelector("#fuel-type-input");

    let carName = carNameInput.value;
    let vehicleClass = vehicleClassInput.getAttribute("data-value");
    let engineSize = engineSizeInput.value;
    let cylinders = cylindersInput.value;
    let transmission = transmissionInput.getAttribute("data-value");
    let CO2Rating = CO2RatingInput.value;
    let fuelType = fuelTypeInput.getAttribute("data-value");


    // checkEmptyInputs();

    return {
        carName,
        vehicleClass,
        engineSize,
        cylinders,
        transmission,
        CO2Rating,
        fuelType
    }

}

async function sendCarDetails(details){

    let {
        carName,
        vehicleClass,
        engineSize,
        cylinders,
        transmission,
        CO2Rating,
        fuelType
    } = details;

    let params = 
    `carName=${carName}&&`+
    `vehicleClass=${vehicleClass}&&`+
    `engineSize=${engineSize}&&`+
    `cylinders=${cylinders}&&`+
    `transmission=${transmission}&&`+
    `CO2Rating=${CO2Rating}&&`+
    `fuelType=${fuelType}`;

    let callObject = {
        phpFilePath: "include/add-car.php",
        rejectMessage: "car not added",
        params,
        type: "post",
    }

    return await AJAXCall(callObject);
}