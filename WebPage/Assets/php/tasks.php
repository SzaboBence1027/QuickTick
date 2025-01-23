<?php
require_once 'connect.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User ID is required']);
    exit;
}

$user_id = intval($_SESSION['user_id']);
$selected_date = $_GET['date'] ?? null;

if (!$selected_date) {
    echo json_encode(['success' => false, 'message' => 'Date is required']);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT * FROM task WHERE user_id = :user_id AND deadline = :selected_date ORDER BY priority DESC');
    $stmt->execute(['user_id' => $user_id, 'selected_date' => $selected_date]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($tasks)) {
        echo json_encode(['success' => true, 'message' => 'Nincs feladatod erre a napra']);
    } else {
        echo json_encode(['success' => true, 'tasks' => $tasks]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>