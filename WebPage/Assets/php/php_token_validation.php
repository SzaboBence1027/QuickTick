<?php
require_once 'vendor/autoload.php';  // Include Composer autoloader
use \Firebase\JWT\JWT;

$secret_key = "k6ar3npeJjxd";  // Your secret key

// Function to get JWT from cookies or Authorization header
function getToken() {
    if (isset($_COOKIE['token'])) {
        return $_COOKIE['token'];  // Token from cookies
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);  // Token from Authorization header
    }
    return null;
}

// Get the token from request
$token = getToken();

if ($token) {
    try {
        // Decode the JWT
        $decoded = JWT::decode($token, $secret_key, array('HS256'));

        // Token is valid, continue to the protected content
        echo json_encode(['success' => true, 'message' => 'Token is valid', 'username' => $decoded->username]);
    } catch (Exception $e) {
        // Invalid or expired token
        echo json_encode(['success' => false, 'message' => 'Invalid or expired token']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Token not provided']);
}
?>