<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fuel Predictor</title>
    <link rel="stylesheet" href="assets/css/main.css?7">
    <link rel="stylesheet" href="assets/css/dashboard.css?4">
    <link rel="stylesheet" href="assets/css/sidepane.css?2">

    <link rel="stylesheet" href="assets/css/spinkit.css?2">
    <link rel="stylesheet" href="assets/css/mapview.css?2">
    <link rel="stylesheet" href="assets/css/popup.css">
    <link rel="stylesheet" href="assets/css/dropdown.css?1">
    <link rel="stylesheet" href="assets/css/range.css">
    <link rel="stylesheet" href="assets/css/inputs.css">


    <script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

    <script src="map.js?2" defer></script>
    <script src="assets/js/dropdown.js?1" defer></script>
    <script src="assets/js/range.js" defer></script>
    <script src="index.js?12" defer></script>

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

        <div class="logo">
            <img src="logo.jpeg" alt="">

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
                <input type="text" oninput="giveSuggestions(this.value)" placeholder="type for suggestions">

                <div class="suggestions">

                </div>
            </div>

            <div id='map'>
            </div>
        </div>

        <?php include 'components/sidepane.php'; ?>

    </div>
</body>
</html>