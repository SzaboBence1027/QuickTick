<?php
require_once('connect.php');
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User ID is required']);
    exit;
}
$task_id = $_POST['task_id'] ?? null;
$t_name = $_POST['t_name'] ?? null;
$description = $_POST['description'] ?? null;
$label_id = isset($_POST['label_id']) && $_POST['label_id'] !== '' ? intval($_POST['label_id']) : 1; // Default to "No Label" ID
$priority = $_POST['priority'] ?? null;
$deadline = $_POST['deadline'] ?? null;





try {
    $stmt = $pdo->prepare('UPDATE task SET  t_name = :t_name, description = :description, label_id = :label_id, priority = :priority, deadline = :deadline WHERE id = :task_id');
    $stmt->execute([
        't_name' => $t_name,
        'description' => $description,
        'label_id' => $label_id, // Default to "No Label" ID if no label is provided
        'priority' => $priority,
        'deadline' => $deadline,
        'task_id'=> $task_id
    ]);

    echo json_encode(['success' => true, 'message' => 'Task changed successfully']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
}
