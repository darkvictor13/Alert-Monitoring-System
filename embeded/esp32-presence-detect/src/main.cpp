/* Como adicionar valores em data
{
    char json_string[128];
    StaticJsonDocument<128> json_data;

    json_data["temperature"] = 30;
    json_data["humidity"] = 50;
    serializeJson(json_data, json_string);

    json_document["data"] = json_string;
}
*/

#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "distance_sensor.hpp"
#include "env.h"

static const char* TAG = "Main";

WiFiClient wifi_client;
HTTPClient http_client;

DistanceSensor distance_sensor;

StaticJsonDocument<200> json_document;
char json_string[200];

void setup() {
    distance_sensor.setup();

    json_document["type"] = 0;
    json_document["deviceUuid"] = device_uuid;
    json_document["data"] = "{}";
    serializeJson(json_document, json_string);

    WiFi.begin(wifi_network, wifi_password);
    if (WiFi.waitForConnectResult() != WL_CONNECTED) {
        ESP_LOGE(TAG, "WiFi Failed!");
        delay(5000);
        return;
    }
    ESP_LOGI(TAG, "WiFi connected!");

    http_client.begin(wifi_client, server_host, server_port, server_uri);
    http_client.addHeader("Content-Type", "application/json");
}

void loop() {
    distance_sensor.waitUntil(true);
    // const int ret = http_client.POST(json_string);
    // ESP_LOGI(TAG, "HTTP POST return code: %d", ret);
    // delay(1000);
    distance_sensor.waitUntil(false);
}
