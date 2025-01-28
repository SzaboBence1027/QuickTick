<?php
// Check for a POST request (you can make this more flexible with routing libraries)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Start the session
    session_start();

    // Destroy session variables
    session_unset();
    session_destroy();

    // Set response header to JSON
    header('Content-Type: application/json');
    
    // Return a JSON response indicating success
    echo json_encode(['success' => true]);
    exit();
}

// If we get here, the request method is not POST, so we can handle the error
http_response_code(405); // Method Not Allowed
echo json_encode(['error' => 'Method not allowed']);
exit();