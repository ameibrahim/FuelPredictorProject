<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fuel Predictor</title>
    <link rel="stylesheet" href="assets/css/main.css?11">
    <link rel="stylesheet" href="assets/css/dashboard.css?6">
    <link rel="stylesheet" href="assets/css/sidepane.css?6">

    <link rel="stylesheet" href="assets/css/spinkit.css?3">
    <link rel="stylesheet" href="assets/css/mapview.css?4">
    <link rel="stylesheet" href="assets/css/popup.css?1">
    <link rel="stylesheet" href="assets/css/dropdown.css?2">
    <link rel="stylesheet" href="assets/css/range.css?2">
    <link rel="stylesheet" href="assets/css/inputs.css?2">


    <script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

    <script src="map.js?15" defer></script>
    <script src="assets/js/dropdown.js?2" defer></script>
    <script src="assets/js/range.js?2" defer></script>
    <script src="assets/js/carPredictionAPI.js?3" defer></script>
    <script src="index.js?23" defer></script>

    <?php 
        echo "<script> 
            const USERNAME = '".$_SESSION['username']."';
            const userID = '".$_SESSION['id']."';
        </script>";
    ?>
</head>
<body>
    
    <div class="image-view">
        <img src="background.jpg" alt="">
    </div>

    <div class="user-credentials-view">

        <div class="nav-bar">
            <div class="logos">
                <img src="logo.png" alt="">
                <img src="logo2.png" alt="">
            </div>

            <div class="user-actions">
                <div class="username">Mahmoud</div>
                <div class="logout-icon" onclick="logout()">
                    <img src="assets/icons/exit.png" alt="">
                </div>
            </div>
        </div>

        <?php include 'components/dashboard.php'; ?>

        <div class="sk-flow dashboard-loader">
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
        </div>
        

        <div class="container login-container">
            <div class="heading">
                <h1>Login</h1>
                <p>Enter your credentials to login</p>
            </div>
    
            <div class="form-area">
                <div class="inner-container">
                    <input class="login-username-field" type="text" placeholder="Username">
                    <input class="login-password-field" type="password" placeholder="Password">
                </div>

                <div class="sign-up-link">
                    <p>Don't have an account.</p>
                    <p onclick="showSignup()">Sign Up</p>
                </div>
            </div>
            
    
            <div class="button login-button" onclick="login()">
                <p>Login</p>
                <div class="sk-wave button-loader">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div>
            </div>
        </div>

        <div class="container signup-container">
            <div class="heading">
                <h1>Sign Up</h1>
                <p>Enter your credentials to sign up</p>
            </div>
    
            <div class="form-area">
                <div class="inner-container">
                    <input type="text" placeholder="Username">
                    <input type="text" placeholder="email">
                    <input type="password" placeholder="Password">
                </div>

                <div class="sign-up-link">
                    <p>Have an account?</p>
                    <p onclick="showLogin()">Login</p>
                </div>
            </div>
            
    
            <div class="button signup-button">
                <p>Sign Up</p>
                <div class="sk-wave button-loader">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div>
            </div>
        </div>

        <div class="copyright-section">@FuelPredictor 2023. All Rights Reserved</div>

    </div>

    <?php include 'components/add-car-overlay.php'; ?>

    <div class="map-view-container">
        <div class="back-arrow-container" onclick="slideOutMapView()">
            <img src="assets/icons/left-arrow.png" alt="">
        </div>

        <div class="map-view">
            <div class="search-area">
                
                <div class="input-box-container">
                    <input class="start-input-location" type="text" oninput="giveSuggestions(this)" placeholder="Start Location">
                    <input class="end-input-location" type="text" oninput="giveSuggestions(this)" placeholder="End Destination">
                </div>
                
                <div class="button" onclick="getRoute(source, destination)">Drive</div>


                <div class="suggestions ">
                </div>

            </div>

            <div id='map'>
            </div>
        </div>

        <?php include 'components/sidepane.php'; ?>

    </div>
</body>
</html>