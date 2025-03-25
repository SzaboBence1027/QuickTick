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
$label_id = $_GET['label_id'] ?? null;

if (!$selected_date) {
    echo json_encode(['success' => false, 'message' => 'Date is required']);
    exit;
}

try {
    // Base query
    $query = 'SELECT task.*, label.l_name as label_name, label.color as label_color 
              FROM task 
              LEFT JOIN label ON task.label_id = label.id 
              WHERE task.user_id = :user_id AND task.deadline = :selected_date';

    // Add label filter only if label_id is provided
    if (!empty($label_id)) {
        $query .= ' AND task.label_id = :label_id';
    }

    $query .= ' ORDER BY task.priority DESC';

    // Debugging: Log the query and parameters
    error_log("Query: $query");
    error_log("Parameters: " . json_encode(['user_id' => $user_id, 'selected_date' => $selected_date, 'label_id' => $label_id]));

    $stmt = $pdo->prepare($query);
    $params = ['user_id' => $user_id, 'selected_date' => $selected_date];

    if (!empty($label_id)) {
        $params['label_id'] = $label_id;
    }

    $stmt->execute($params);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($tasks)) {
        echo json_encode(['success' => true, 'tasks' => [], 'message' => 'Nincs feladatod erre a napra']);
    } else {
        echo json_encode(['success' => true, 'tasks' => $tasks]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>