<div class="overlay car-overlay">
    <div class="popup">
        <div class="popup-header">
            <div class="close-button" onclick="closeAddCarOverlay()">
                <img src="assets/icons/close.png" alt="">
            </div>
            <h1 class="pop-up-title">Add A Car</h1> 
        </div>

        <div class="popup-body">

            <div class="car-form">
                <div class="input-box">
                    <label for="">Car Name</label>
                    <input type="text" id="car-name-input">
                </div>

                <div class="input-box">
                    <label for="">Vehicle Class</label>
                    <div class="dropdown" id="vehicle-class-input" data-value="Select A Vehicle Class" data-empty="true">
                        <ul class="values">
                            <li>Two-seater</li>
                            <li>Minicompact</li>
                            <li>Compact</li>
                            <li>Subcompact</li>
                            <li>Mid-size</li>
                            <li>Full-size</li>
                            <li>SUV: Small</li>
                            <li>SUV: Standard</li>
                            <li>Minivan</li>
                            <li>Station wagon: Small</li>
                            <li>Station wagon: Mid-size</li>
                            <li>Pickup truck: Small</li>
                            <li>Special purpose vehicle</li>
                            <li>Pickup truck: Standard</li>
                        </ul>
                    </div>
                </div>

                <div class="range-input-box span-column">
                    <label for="">Engine Size</label>
                    <div class='range' onchange="bindValue(this)">
                        <input id="engine-size-input" type="range" min='0' max='10' step='0.1' value="0" />
                        <span>0</span>
                    </div>
                </div>

                <div class="range-input-box">
                    <label for="">Cylinders</label>
                    <div class='range' onchange="bindValue(this)">
                        <input id="cylinders-input" type="range" min='0' max='16' step='1' value="0" />
                        <span>0</span>
                    </div>
                </div>

                <div class="input-box">
                    <label for="">Transmission</label>
                    <div class="dropdown" id="transmission-input" data-value="Choose Transmission Type" data-empty="true">
                        <ul class="values">
                            <li>AV</li>
                            <li>AM</li>
                            <li>M</li>
                            <li>AS</li>
                            <li>A</li>
                        </ul>
                    </div>
                </div>

                <div class="range-input-box">
                    <label for="">CO2 Rating</label>
                    <div class='range' onchange="bindValue(this)">
                        <input id="co2-rating-input" type="range" min='0' max='16' step='0.1' value="0" />
                        <span>0</span>
                    </div>
                </div>

                <div class="input-box">
                    <label for="">Fuel Type</label>
                    <div class="dropdown" id="fuel-type-input" data-value="Choose Fuel Type" data-empty="true">
                        <ul class="values">
                            <li>D</li>
                            <li>E</li>
                            <li>X</li>
                            <li>Z</li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>

        <div class="popup-footer">
            <div class="button add-car-button" onclick="addCar(this)">
                <p>Add Car</p>
                <div class="sk-wave button-loader">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div>
            </div>
        </div>
    </div>
</div>