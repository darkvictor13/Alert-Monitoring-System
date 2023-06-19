#include <ArduinoJson.h>
#include <MQTT.h>
#include <WiFi.h>

#include "distance_sensor.hpp"
#include "env.h"

static const char* TAG = "Main";

WiFiClient wifi_client;
MQTTClient mqtt_client;

DistanceSensor distance_sensor(26, 27, 100);

StaticJsonDocument<200> json_document;
char json_string[200];

void setup() {
    distance_sensor.setup();

#ifndef TEST_MODE
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

    mqtt_client.begin(server_host, wifi_client);
    while (!mqtt_client.connect(device_uuid)) {
        ESP_LOGE(TAG, "trying to connect to MQTT...");
    }
#endif
}

void loop() {
#ifndef TEST_MODE
    distance_sensor.waitUntil(true);
    if (!mqtt_client.connected()) {
        ESP_LOGI(TAG, "MQTT not connected!");
    }
    mqtt_client.publish("alert", json_string);
    delay(1000);
    distance_sensor.waitUntil(false);
#else
    distance_sensor.getDistanceInCm();
#endif
}
