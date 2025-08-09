<?php
// order.php (backend script that receives orders)

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $orderDetails = json_decode(file_get_contents('php://input'), true);

    // Check if all necessary data is provided
    if (isset($orderDetails['customer_name'], $orderDetails['items']) && is_array($orderDetails['items'])) {
        // Send the order to Discord with retries
        $success = sendToDiscord($orderDetails);

        if ($success) {
            // Respond back to the frontend with a success message
            echo json_encode(["status" => "success", "message" => "Order received successfully!"]);
        } else {
            // Respond back to the frontend with an error message
            echo json_encode(["status" => "error", "message" => "Failed to send order to Discord."]);
        }
    } else {
        // Respond with an error if required fields are missing
        echo json_encode(["status" => "error", "message" => "Missing required order details."]);
    }
}

function sendToDiscord($orderDetails) {
    // Discord webhook URL
    $webhookUrl = "";

    // Prepare the message payload with BurgerShot branding
    $itemsList = implode("\n", $orderDetails['items']); // Join the items array into a string
    
    $data = json_encode([
        "content" => "New BurgerShot Order!", // Main message content
        "embeds" => [
            [
                "title" => "Order Details",
                "description" => "Here's the latest order from a customer at BurgerShot.",
                "color" => 16711680, // Red color matching the BurgerShot theme
                "fields" => [
                    [
                        "name" => "Customer Name",
                        "value" => $orderDetails['customer_name'],
                        "inline" => true
                    ],
                    [
                        "name" => "Items Ordered",
                        "value" => $itemsList,
                        "inline" => false
                    ]
                ],
                "footer" => [
                    "text" => "BurgerShot - Freshly Grilled Burgers, Made with Love 🍔",
                    "icon_url" => "https://stagnes.ldas.dev/burgershot/assets/Burgershot_Logo.png"
                ],
                "thumbnail" => [
                    "url" => "https://stagnes.ldas.dev/burgershot/assets/burgershot/coffee.png" // Thumbnail of coffee
                ]
            ]
        ]
    ]);

    // cURL setup for sending to the Discord webhook
    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    // Retry setup
    $maxRetries = 3;
    $attempts = 0;
    $success = false;

    while ($attempts < $maxRetries && !$success) {
        $response = curl_exec($ch);
        $attempts++;

        // Check if there was an error with the request
        if ($response === false) {
            $error = curl_error($ch);
            // Optionally log the error for debugging purposes
            error_log("Error sending to Discord webhook (Attempt $attempts): $error");
        } else {
            // If the request was successful, break the loop
            $success = true;
        }

        // Delay before retrying
        if (!$success) {
            sleep(2); // Wait 2 seconds before retrying
        }
    }

    curl_close($ch);

    return $success; // Return true if successful, false otherwise
}
?>
