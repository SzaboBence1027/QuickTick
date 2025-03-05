<?php
require_once 'connect.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->prepare('SELECT id, l_name, color FROM label');
    $stmt->execute();
    $labels = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'labels' => $labels]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>