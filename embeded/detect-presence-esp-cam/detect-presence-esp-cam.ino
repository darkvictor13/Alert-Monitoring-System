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
#include <base64.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "distance_sensor.hpp"
#include "camera.hpp"
#include "env.hpp"

static const char* TAG = "Main";

HTTPClient http_client;
WiFiClient wifi_client;

uint8_t trigger_pin = 13;
uint8_t echo_pin = 12;

Camera camera;
DistanceSensor distance_sensor(trigger_pin, echo_pin, 100);

//#define TEST_MODE

void setup() {
  ESP_LOGI(TAG, "Starting");
  distance_sensor.setup();

#ifndef TEST_MODE
  WiFi.begin(wifi_network, wifi_password);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    ESP_LOGE(TAG, "WiFi Failed!");
    delay(5000);
    return;
  }
  ESP_LOGI(TAG, "WiFi connected!");
  camera.init();
#endif
}

void loop() {
#ifndef TEST_MODE

  distance_sensor.waitUntil(true);
  String temp_json;
  auto picture = camera.takePicture();
  const String encodedImg = base64::encode(picture->buf, picture->len);
  camera.freePicture(picture);

  DynamicJsonDocument internal_json_data(encodedImg.length() + 64);
  internal_json_data["size"] = encodedImg.length();
  internal_json_data["buffer"].set(std::move(encodedImg));
  serializeJson(internal_json_data, temp_json);

  DynamicJsonDocument json_document(internal_json_data.memoryUsage() + 128);
  internal_json_data.clear();
  json_document["type"] = 1;
  json_document["deviceUuid"] = device_uuid;
  json_document["data"].set(std::move(temp_json));

  String json_string;
  serializeJson(json_document, json_string);
  json_document.clear();

  http_client.begin(wifi_client, server_host, server_port, server_uri);
  http_client.addHeader("Content-Type", "application/json");
  const int ret = http_client.POST(json_string);
  ESP_LOGI(TAG, "HTTP POST return code: %d", ret);
  http_client.end();

  distance_sensor.waitUntil(false);
#else
  distance_sensor.getDistanceInCm();
  delay(2000);
#endif
}