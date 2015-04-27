<?php
    require_once(__DIR__ . "/../model/cofig.php");
    
    unset($_SESSION["authenticated"]);
    
    session_destroy();
    header("location: " . $path . "index.php");
    
    
    
    