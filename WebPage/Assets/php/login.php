<?php



header('Content-Type: application/json');
require_once("connect.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Get input values
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['error' => 'Email and password are required','success' => true]);
        exit;
    }

    // Fetch user by email
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    error_log("Stored password hash: " . $user['password']);
    if (!$user['email']===$email|| !password_verify($password, $user['password'])) {
        echo json_encode(['error' => 'Invalid email or password','success' => true]);
        
        exit;
    }

    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['user_name']=$user['name'];
    $_SESSION['logged_in'] = true;

    // Successful login
    echo json_encode(['message' => 'Login successful', 'success' => true,'logged_in' => true,
        'user_id' => $_SESSION['user_id'],
        'email' => $_SESSION['email']]);
}


?>
