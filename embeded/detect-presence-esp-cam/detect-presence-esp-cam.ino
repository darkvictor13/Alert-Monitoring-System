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
#include "camera.hpp"
#include "env.hpp"

static const char* TAG = "Main";

WiFiClient wifi_client;

uint8_t trigger_pin = 13;
uint8_t echo_pin = 12;

Camera camera;
DistanceSensor distance_sensor(trigger_pin, echo_pin, 100);

StaticJsonDocument<200> json_document;
char json_string[200];

//#define TEST_MODE

void setup() {
  ESP_LOGI(TAG, "Starting");
  distance_sensor.setup();
  camera.init();

#ifndef TEST_MODE
  json_document["type"] = 0;
  json_document["deviceUuid"] = device_uuid;
  //json_document["data"] = "{}";

  WiFi.begin(wifi_network, wifi_password);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    ESP_LOGE(TAG, "WiFi Failed!");
    delay(5000);
    return;
  }
  ESP_LOGI(TAG, "WiFi connected!");
#endif
  ESP_LOGI(TAG, "End setup!");
}

void loop() {
  ESP_LOGI(TAG, "Inside loop");
#ifndef TEST_MODE
  distance_sensor.waitUntil(true);
  const auto picture = camera.takePicture();
  //{
    ESP_LOGI(TAG, "MIN size: %llu", picture->len);
    char json_string[65536];
    StaticJsonDocument<65536> json_data;

    json_data["buffer"] = picture->buf;
    json_data["size"] = picture->len;
    serializeJson(json_data, json_string);
    ESP_LOGI(TAG, "JSON: %s", json_string);

    json_document["data"] = json_string;
  //}
  serializeJson(json_document, json_string);

  // essa lib ruim nao sabe lidar com conexões persistentes ao backend
  // por isso a melhor coisa é criar dnv a conexão para evitar bugs
  HTTPClient http_client;
  http_client.begin(wifi_client, server_host, server_port, server_uri);
  http_client.addHeader("Content-Type", "application/json");
  const int ret = http_client.POST(json_string);
  ESP_LOGI(TAG, "HTTP POST return code: %d", ret);
  http_client.end();
  delay(1000);

  distance_sensor.waitUntil(false);
#else
  distance_sensor.getDistanceInCm();
  delay(2000);
#endif
}