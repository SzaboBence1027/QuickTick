<?php
require_once 'connect.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User ID is required']);
    exit;
}

$user_id = intval($_SESSION['user_id']);

try {
    $stmt = $pdo->prepare('SELECT * FROM task WHERE user_id = :user_id');
    $stmt->execute(['user_id' => $user_id]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'tasks' => $tasks]);
   
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>