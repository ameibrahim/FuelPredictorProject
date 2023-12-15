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

    return { 
        vehicleClass: String(vehicleClassIndex),
        engineSize: String(engineSize),
        cylinders: String(cylinders),
        transmission: String(transmissionIndex),
        CO2Rating: String(CO2Rating),
        D: fuelTypeArray[0],
        E: fuelTypeArray[1],
        X: fuelTypeArray[2],
        Z: fuelTypeArray[3]
    };
}

async function predictWithObject(carIndexedDetailsObject){

    let { 
        vehicleClass,
        engineSize,
        cylinders,
        transmission,
        CO2Rating,
        D,
        E,
        X,
        Z
    } = carIndexedDetailsObject
    
    let url = `http://ame.megamindame.com:5000/get-results/?vehicleClass=${vehicleClass}&engineSize=${engineSize}&cylinders=${cylinders}&transmission=${transmission}&CO2Rating=${CO2Rating}&D=${D}&E=${E}&X=${X}&Z=${Z}`
    
    try {
        let result = await fetch(url, { method: 'GET' });
        let JSONResult = await result.json();
        let fuel = JSONResult.fuel_result
        let co2 = JSONResult.CO2_result

        console.log({
            fuel,
            co2
        })

        return {
            fuel,
            co2
        }
    }
    catch(error){
        return {
            fuel: "Error",
            co2: "Error"
        }
    }
}
