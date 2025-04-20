<?php
require_once 'connect.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Felhasználó nincs bejelentkezve']);
    exit;
}

$user_id = intval($_SESSION['user_id']);
$current_date = date('Y-m-d'); // Get the current date
$type = $_GET['type'] ?? 'future'; // Default to 'future' if no type is provided

try {
    // Base query
    $query = 'SELECT 
                task.deadline, 
                task.t_name, 
                task.description, 
                label.l_name as label_name, 
                label.color as label_color
              FROM task
              LEFT JOIN label ON task.label_id = label.id
              WHERE task.user_id = :user_id';

    // Adjust the query based on the type
    if ($type === 'future') {
        $query .= ' AND task.deadline >= :current_date AND task.progresson = 0 ORDER BY task.deadline ASC';
    } elseif ($type === 'past') {
        $query .= ' AND task.deadline < :current_date ORDER BY task.deadline DESC';
    } else {
        echo json_encode(['success' => false, 'message' => 'Nem megfelelő típus']);
        exit;
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute(['user_id' => $user_id, 'current_date' => $current_date]);

    $events = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $date = $row['deadline'];
        if (!isset($events[$date])) {
            $events[$date] = [];
        }
        $events[$date][] = [
            't_name' => $row['t_name'],
            'description' => $row['description'],
            'label_name' => $row['label_name'],
            'label_color' => $row['label_color']
        ];
    }

    echo json_encode(['success' => true, 'events' => $events]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>