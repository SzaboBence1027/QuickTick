<?php
require_once './firebase/php-jwt-6.10.2/src/JWT.php';  
use \Firebase\JWT\JWT;
require_once("connect.php");


// JWT secret key
$secret_key = "k6ar3npeJjxd"; 

// Create a PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

if (isset($_POST['username']) && isset($_POST['password'])) {
    $inputUsername = $_POST['username'];
    $inputPassword = $_POST['password'];

    // Find the user in the database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $inputUsername);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($inputPassword, $user['password'])) {
        // Create JWT
        $issued_at = time();
        $expiration_time = $issued_at + 3600;  // Valid for 1 hour
        $payload = array(
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "username" => $user['username'],
            "user_id" => $user['id']
        );
        
        // Encode the JWT
        $jwt = JWT::encode($payload, $secret_key);

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'token' => $jwt
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect credentials']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
}
?>
