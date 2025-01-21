<?php
session_start();
require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'User not logged in']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $t_name = $_POST['t_name'] ?? '';
    $description = $_POST['description'] ?? '';
    $label_id = $_POST['label_id'] ?? null;
    $priority = $_POST['priority'] ?? null;
    $progresson = $_POST['progresson'] ?? null;
    $deadline = $_POST['deadline'] ?? null;

    if (empty($t_name)) {
        echo json_encode(['success' => false, 'message' => 'Task name is required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO task (t_name, description, user_id, label_id, priority, progresson, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$t_name, $description, $user_id, $label_id, $priority, $progresson, $deadline]);
        echo json_encode(['success' => true, 'message' => 'Task added successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to add task: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>