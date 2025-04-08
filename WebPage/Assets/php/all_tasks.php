<?php
require_once 'connect.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated']);
    exit;
}

$user_id = intval($_SESSION['user_id']);
$current_date = date('Y-m-d'); // Get the current date

try {
    // Query to fetch events from the current date onwards
    $query = 'SELECT task.deadline, task.t_name, label.l_name as label_name, label.color as label_color
              FROM task
              LEFT JOIN label ON task.label_id = label.id
              WHERE task.user_id = :user_id AND task.deadline >= :current_date AND task.progresson = 0
              ORDER BY task.deadline ASC';

    $stmt = $pdo->prepare($query);
    $stmt->execute(['user_id' => $user_id, 'current_date' => $current_date]);

    $events = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $date = $row['deadline'];
        if (!isset($events[$date])) {
            $events[$date] = [];
        }
        $events[$date][] = $row['t_name'] . ', ' . $row['label_name'];
    }

    echo json_encode(['success' => true, 'events' => $events]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>