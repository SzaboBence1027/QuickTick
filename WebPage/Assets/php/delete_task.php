<?php

session_start();
require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $_SESSION['user_id'] = 8;
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }
    $user_id = intval($_SESSION['user_id']);
    $t_id = $data['t_id'] ?? null*;
    if (!$t_id) {
        echo json_encode(['success' => false, 'message' => 'Task ID is required']);
        exit;
    }
    try {
        $stmt = $pdo->prepare('DELETE FROM task WHERE user_id = :user_id AND id = :t_id');
        $stmt->execute(['user_id' => $user_id, 't_id' => $t_id]);
        echo json_encode(['success' => true, 'message' => 'Task deleted successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
    }
} 
else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

