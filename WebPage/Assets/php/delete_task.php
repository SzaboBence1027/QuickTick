<?php
require_once 'connect.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Feladat azonosító szükséges']);
    exit;
}

$task_id = $_GET['task_id'] ?? null;

if (!$task_id) {
    echo json_encode(['success' => false, 'message' => 'Feladat azonosító szükséges']);
    exit;
}

try {
    $query = 'DELETE FROM task WHERE id = :task_id AND user_id = :user_id';
    $stmt = $pdo->prepare($query);
    $stmt->execute(['task_id' => $task_id, 'user_id' => $_SESSION['user_id']]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Feladat sikeresen törölve']);
    } else {
        echo json_encode(['success' => false, 'message' =>'Feladatot nem sikerült törölni']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>