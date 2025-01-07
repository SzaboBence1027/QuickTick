<?php
session_abort();
session_destroy();
echo json_encode(['message' => 'Logout successful','logged_in' => false]);

?>