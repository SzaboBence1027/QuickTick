<?php

require_once 'connect.php';
header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Handle POST request to update task progression
       
        $input = json_decode(file_get_contents('php://input'), true); // Parse JSON body
        $task_id = $input['task_id'] ?? null;
        error_log('Received task_id: ' . $task_id); // Debugging line

        if (!$task_id ) {
            echo json_encode(['success' => false, 'message' => 'Invalid input',"task_id"=>$task_id]);
            exit;
        }

        // Update the task progression
        $updateQuery = 'UPDATE task SET progresson = 1 WHERE id = :task_id';
        $stmt = $pdo->prepare($updateQuery);
        $stmt->execute([ 'task_id' => $task_id]);

        echo json_encode(['success' => true, 'message' => 'Task progression updated successfully']);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Handle GET request for marking expired tasks and deleting old tasks

        // Step 1: Mark tasks as expired (progresson = 3) if the deadline has passed and they are not completed
        $markExpiredQuery = 'UPDATE task 
                             SET progresson = 3 
                             WHERE deadline < CURDATE() AND progresson = 0';
        $pdo->exec($markExpiredQuery);

        // Step 2: Delete tasks that are 30 days past their deadline
        $deleteQuery = 'DELETE FROM task 
                        WHERE deadline < DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
        $pdo->exec($deleteQuery);

        echo json_encode(['success' => true, 'message' => 'Tasks updated and old tasks deleted successfully']);
    } else {
        // Handle unsupported request methods
        http_response_code(405); // Method Not Allowed
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>