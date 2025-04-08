<?php
require_once("connect.php");

if ($_SERVER['REQUEST_METHOD']==='POST')
 {
    echo json_encode(['success' => false, 'message' => 'Method not  allowed']);
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User ID is required']);
    exit;
}