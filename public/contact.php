<?php
// Cabeceras CORS para permitir solicitudes
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Si es una solicitud OPTIONS (preflight), respondemos exitosamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo procesamos solicitudes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Solo se permiten solicitudes POST']);
    exit;
}

try {
    // Destino del email
    $destino = "info@estudiocils.com.ar";
    
    // Leer el cuerpo JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (!$data) {
        throw new Exception("Datos inválidos");
    }
    
    // Extraer datos del formulario
    $nombre = isset($data['name']) ? trim($data['name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $telefono = isset($data['phone']) ? trim($data['phone']) : '';
    $empresa = isset($data['company']) ? trim($data['company']) : '';
    $servicio = isset($data['service']) ? trim($data['service']) : '';
    $mensaje = isset($data['message']) ? trim($data['message']) : '';
    
    // Validaciones mínimas
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        throw new Exception("Nombre, email y mensaje son obligatorios");
    }
    
    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Email inválido");
    }
    
    // Crear asunto
    $asunto = "Consulta desde Web - Estudio CILS";
    if (!empty($servicio)) {
        $asunto .= " - " . $servicio;
    }
    
    // Crear mensaje HTML
    $mensajeHTML = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #106973; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f8f9fa; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #106973; }
            .value { margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nueva Consulta desde el Sitio Web</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Nombre:</div>
                    <div class='value'>" . htmlspecialchars($nombre) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>";
    
    if (!empty($telefono)) {
        $mensajeHTML .= "
                <div class='field'>
                    <div class='label'>Teléfono:</div>
                    <div class='value'>" . htmlspecialchars($telefono) . "</div>
                </div>";
    }
    
    if (!empty($empresa)) {
        $mensajeHTML .= "
                <div class='field'>
                    <div class='label'>Empresa:</div>
                    <div class='value'>" . htmlspecialchars($empresa) . "</div>
                </div>";
    }
    
    if (!empty($servicio)) {
        $mensajeHTML .= "
                <div class='field'>
                    <div class='label'>Servicio de interés:</div>
                    <div class='value'>" . htmlspecialchars($servicio) . "</div>
                </div>";
    }
    
    $mensajeHTML .= "
                <div class='field'>
                    <div class='label'>Mensaje:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($mensaje)) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>Este mensaje fue enviado desde el formulario de contacto de estudiocils.com.ar</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Crear mensaje de texto plano (fallback)
    $mensajeTexto = "Nueva Consulta desde el Sitio Web\n\n";
    $mensajeTexto .= "Nombre: $nombre\n";
    $mensajeTexto .= "Email: $email\n";
    if (!empty($telefono)) $mensajeTexto .= "Teléfono: $telefono\n";
    if (!empty($empresa)) $mensajeTexto .= "Empresa: $empresa\n";
    if (!empty($servicio)) $mensajeTexto .= "Servicio: $servicio\n";
    $mensajeTexto .= "\nMensaje:\n$mensaje\n";
    
    // Cabeceras del email
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Formulario Web <formulario@estudiocils.com.ar>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Enviar email
    $success = mail($destino, $asunto, $mensajeHTML, $headers);
    
    if ($success) {
        // Log exitoso (opcional)
        error_log("Formulario enviado exitosamente desde: $email");
        
        echo json_encode([
            'success' => true, 
            'message' => 'Mensaje enviado correctamente. Te responderemos pronto.'
        ]);
    } else {
        throw new Exception("No se pudo enviar el email");
    }
    
} catch (Exception $e) {
    // Log del error
    error_log("Error en formulario de contacto: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.'
    ]);
}
?>
