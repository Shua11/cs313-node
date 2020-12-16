<?php

?>

<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" type="text/css" href="login.css">
</head>

<body>
    <div class="form">
        <h2>Sign up for new account</h2>

        <form id="mainForm" action="createAccount.php" method="POST">
            <div class="input">
                <div class="inputBox">
                    <label>Username</label>
                    <input type="text" id="txtUser" name="txtUser" placeholder="johndoe@qwe.com">
                </div>
                <div class="inputBox">
                    <label>Password</label>
                    <input type="password" id="txtPassword" name="txtPassword" name="" placeholder="********"></input>
                    <?php 
                     if ($_GET["error"]=='missmatch')
                     { echo '*'; }
                     ?>
                </div>
                <div class="inputBox">
                    <label>Retype Password</label>
                    <input type="password" id="txtPassword2" name="txtPassword2" onblur="testscript()" name="" placeholder="********"></input>
                    <?php 
                     if ($_GET["error"]=='missmatch')
                     { echo '*'; }
                     ?>
                </div>

                  <?php 
                  if ($_GET["error"]=='missmatch')
                  {
                     echo '<span style="color:red">Passwords did not match</span>';
                  }
                  elseif ($_GET["error"]=='passwordcheck')
                  {
                     echo '<span style="color:red">Passwords must be > 7 characters and contain at least one #. </span>';
                  }
                  ?>
                  <div>
                  <span style="color:red" id="txterror"></span>
                  </div>
                <div class="inputBox">
                    <input type="submit" name="" value="Create Account">
                </div>
            </div>
        </form>
        <p class="forgot"> Write Down Your Forgot Your Password.</p>
        <a class="forgot" href="prove07.php">Cancel</a>
    </div>

    <script>
    function testscript()
    {
         var pass1 = document.getElementById("txtPassword").value;
         var pass2 = document.getElementById("txtPassword2").value;
         var error = document.getElementById("txterror");
         var pattern = /\d/g;

         if (pass1 != pass2)
         {
            error.innerHTML = "Missmatched passwords";
            return;
         }

         if (pass1.length < 7 || pass1.match(pattern))
         {
            error.innerHTML = "Passwords must be > 7 characters and contain at least one #";
            return;
         }
    }

    </script>
</body>
</html>