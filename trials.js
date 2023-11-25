let carArray = {
    carName: "Mercedes",
    vehicleClass: "Two-seater",
    engineSize: 5,
    cylinders: 6,
    transmission : "AV",
    CO2Rating: 6,
    fuelType: "X"
}

function convertToArrayOfIndexes(array){

    vehicleClassChoices = ['Two-seater','Minicompact','Compact','Subcompact','Mid-size','Full-size','SUV: Small','SUV: Standard','Minivan','Station wagon: Small','Station wagon: Mid-size','Pickup truck: Small','Special purpose vehicle','Pickup truck: Standard']
    transmissionChoices = ['AV','AM','M','AS','A']
    fuelTypeChoices = ["D","E","X","Z"]

    let { 
        vehicleClass, 
        engineSize, 
        cylinders, 
        transmission, 
        CO2Rating, 
        fuelType 
    } = array;

    let vehicleClassIndex = vehicleClassChoices.indexOf(vehicleClass);
    let transmissionIndex = transmissionChoices.indexOf(transmission);
    let fuelTypeArray = [];

    switch (fuelType) {
        case "D":
            fuelTypeArray = [1,0,0,0];
        break;
        case "E":
            fuelTypeArray = [0,1,0,0];
        break;
        case "X":
            fuelTypeArray = [0,0,1,0];
        break;
        case "Z":
            fuelTypeArray = [0,0,0,1];
        break;
    }

    return [ 
        vehicleClassIndex, 
        engineSize, 
        cylinders, 
        transmissionIndex, 
        CO2Rating, 
        ...fuelTypeArray 
    ];
}

console.log(convertToArrayOfIndexes(carArray));