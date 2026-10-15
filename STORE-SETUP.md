# Activación de la tienda UNOVIX

Implementación local: panel en /admin, catálogo en /productos, detalle en /producto/identificador. La compra es de una unidad por pedido; todavía no hay carrito con múltiples productos.

## Supabase
1. Crear un proyecto de Supabase en una cuenta del propietario.
2. Ejecutar supabase/store.sql en su editor SQL. El script crea catálogo, pedidos, funciones con transacciones y bucket de imágenes. Revisar en un proyecto de prueba primero.
3. Crear el usuario del propietario en Authentication > Users. No hay registro público en este sitio.
4. Desde el editor SQL asignar el rol al correo correcto: update auth.users set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb where email = 'CORREO_REAL_DEL_PROPIETARIO';
5. Copiar .env.example a .env.local y configurar SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en privado. La clave de servicio solo va en el servidor. Configurar las mismas variables en Vercel al publicar.
6. Reiniciar el servidor. Abrir /admin e iniciar sesión. La sesión dura hasta una hora; volver a entrar al expirar.
7. Editar los productos iniciales, cargar fotos, agregar precios y existencias reales. Una casilla permite ocultar un producto, conservando los pedidos anteriores.

## Mercado Pago
1. Crear una aplicación Checkout Pro en las integraciones de la cuenta de empresa.
2. Configurar credenciales de prueba y MERCADOPAGO_TEST_MODE=true. Configurar la firma de Webhooks para pagos en la URL HTTPS pública /api/mercadopago/webhook.
3. Guardar MERCADOPAGO_ACCESS_TOKEN y MERCADOPAGO_WEBHOOK_SECRET exclusivamente en las variables del servidor.
4. Definir STORE_URL con la URL HTTPS real, SHIPPING_MXN con la tarifa acordada y ENABLE_ONLINE_PAYMENTS=true solo para realizar pruebas en el entorno de pruebas.
5. Probar pago aprobado, pendiente, rechazado, repetición de notificaciones, falta de inventario y devolución. La página de regreso no declara pagos aprobados. La notificación firmada consulta el pago a Mercado Pago y compara referencia, importe, MXN y modo de prueba/producción.
6. Antes de vender: publicar políticas reales de entrega, privacidad, cambios y devoluciones; verificar tarifa y cobertura de envío, datos de contacto y precios; completar una compra de prueba de principio a fin. Revisar el acceso privado y el SQL con pruebas en Supabase.
7. Pasar a credenciales productivas, MERCADOPAGO_TEST_MODE=false y comprobar el circuito productivo. Las credenciales siguen fuera del repositorio.

## Pedidos e inventario
El precio y la disponibilidad se obtienen del servidor. La creación del pedido reserva una unidad dentro de una transacción para impedir vender la última unidad dos veces. Los pagos rechazados o cancelados liberan la reserva. El panel permite cancelar reservas pendientes después de revisar el pago; las preferencias expiran a los 30 minutos, pero no se liberan automáticamente. Si llega un pago tardío sin stock, se muestra como pago recibido para revisar existencias: resolver entrega o reembolso con el cliente. Los reembolsos y contracargos no reponen stock automáticamente: verificar primero si la mercancía volvió.

Las imágenes se almacenan con nombres únicos. Al quitar una foto de un producto se quita su asociación, sin borrar el archivo del bucket; limpiar archivos huérfanos desde Supabase si es necesario. Las fotos se sirven públicamente; no subir datos privados. El panel muestra los 100 pedidos más recientes. WhatsApp abre el pedido como mensaje que envía el comprador; no genera un pago ni registra automáticamente una orden en la base de datos.

## Pendientes externos
No se crearon cuentas, no se conectaron credenciales, no se ejecutó SQL remoto y no se publicaron cambios. Falta comprobar integración real con las cuentas del propietario. No habilitar ventas hasta completar esas pruebas. No hay integración bancaria directa con Hey Banco.

## Formularios por categoría
El catálogo incluye plantillas de celulares, tabletas, galleteros, audífonos, cargadores, cables, accesorios y hogar. Cada producto guarda specifications como una lista de nombre/valor. Para instalaciones ya creadas ejecutar supabase/product-specifications.sql; para nuevas se incluye en store.sql. El nombre sugiere la categoría y el propietario confirma la plantilla. Los valores se rellenan con información real, no se inventan. Las categorías no previstas tienen una ficha general ampliable. Se puede probar sin conexión en /admin/formulario, sin guardar ni publicar.

## Ampliación del catálogo por título
El clasificador local ahora cubre 50 familias con rutas por niveles, campos por familia, detección automática al escribir y selección manual respetada. No se conecta a la API de Mercado Libre ni es una copia completa de su árbol. La ruta de referencia verificada para cocina es Hogar, Muebles y Jardín > Cocina > Almacenamiento y Organización > Contenedores; otras rutas son una adaptación para esta tienda. No se guardan IDs oficiales de Mercado Libre. El predictor documentado requiere una integración separada si se desea sincronización real.
Fuentes: https://developers.mercadolibre.com.mx/dominios-y-categorias y https://listado.mercadolibre.com.mx/hogar-muebles-jardin/cocina/almacenamiento-organizacion/contenedores/
Sin coincidencia clara se conserva una ficha general y se pide elegir categoría; los títulos ambiguos ofrecen hasta cuatro opciones. La clasificación no inventa valores de características.

## Inventario actual
Se agregaron ventiladores, termos y vasos térmicos, peluches, figuras coleccionables, llaveros, escurridores de trastes, especieros, trapeadores, sartenes eléctricos, parrillas eléctricas, freidoras de aire y micas de pantalla. Labubu sin tipo físico pide confirmar entre peluche, figura y llavero; no presume material ni autenticidad. Estas rutas son adaptaciones locales para la tienda, no IDs oficiales de Mercado Libre. La palabra específica tiene prioridad sobre la genérica para distinguir sartén eléctrico de sartén convencional.
