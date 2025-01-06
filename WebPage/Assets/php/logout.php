<?php
session_abort();
session_destroy();
echo json_encode(['message' => 'Login successful','logged_in' => false]);

?>