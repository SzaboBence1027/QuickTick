<?php
/*require_once '../firebase/php-jwt-6.10.2/src/JWT.php';  
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

// Get input data from JSON request
if ($_SERVER['REQUEST_METHOD']==='POST') {
   

if (isset($_POST['email']) && isset($_POST['password'])) {
    $inputEmail = $_POST['email'];
    $inputPassword = $_POST['password'];

    // Find the user in the database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $inputEmail);  // Correctly bind parameter
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

   var_dump($user);
    if ($inputPassword === $user['password']) {
        // Create JWT
        $issued_at = time();
        $expiration_time = $issued_at + 3600;  // Valid for 1 hour
        $payload = array(
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "email" => $user['email'],
            "user_id" => $user['id']
        );
        
        // Encode the JWT
        $jwt = JWT::encode($payload, $secret_key,'HS256');

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'token' => $jwt
        ]);
    } else {
        // Log failed attempt and send error message
        error_log("Failed login attempt for email: " . $inputEmail);
        echo json_encode(['success' => false, 'message' => 'Incorrect credentials']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Username and password required']);
}
}
*/

header('Content-Type: application/json');
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Get input values
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['error' => 'Email and password are required']);
        exit;
    }

    // Fetch user by email
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        echo json_encode(['error' => 'Invalid email or password']);
        exit;
    }

    // Successful login
    echo json_encode(['message' => 'Login successful', 'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']]]);
}


?>
