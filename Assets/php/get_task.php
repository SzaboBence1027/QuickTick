<?php
require_once('connect.php');
header('Content-Type: application/json');

$task_id = $_GET['task_id'] ?? null;

if (!$task_id) {
    echo json_encode(['success' => false, 'message' => 'Task ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT * FROM task WHERE id = :task_id');
    $stmt->execute(['task_id' => $task_id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($task) {
        echo json_encode(['success' => true, 'task' => $task]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Task not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>