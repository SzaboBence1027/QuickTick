<?php

require_once ('connect.php');
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }    
    $user_id=$_SESSION['user_id'];
    try {
        $stmt = $pdo->prepare('SELECT * FROM users WHERE id = :user_id');
            $stmt->execute(['user_id' => $user_id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($user) {
                echo json_encode(['success' => true, 'user' => $user]);
            } else {
                echo json_encode(['success' => false, 'message' => 'User not found']);
            }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
    }
}

        

