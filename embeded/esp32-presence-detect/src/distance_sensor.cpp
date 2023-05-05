#include "distance_sensor.hpp"

static const char* TAG = "DistanceSensor";

static constexpr uint8_t SENSOR_TRIGGER_PIN = 19;
static constexpr uint8_t SENSOR_ECHO_PIN = 18;

static constexpr double SOUND_SPEED_CM_PER_MICROSECOND = 0.034;
static constexpr double FACTOR = SOUND_SPEED_CM_PER_MICROSECOND / 2;

static constexpr uint8_t TIME_BETWEEN_DISTANCE_MEASUREMENTS_MS = 35;

DistanceSensor::DistanceSensor()
    : trigger_pin(SENSOR_TRIGGER_PIN),
      echo_pin(SENSOR_ECHO_PIN),
      distance_threshold(100) {
    ESP_LOGI(TAG, "Starting With Default Values");
}

DistanceSensor::DistanceSensor(const uint8_t trigger_pin,
                               const uint8_t echo_pin,
                               const uint16_t distance_threshold)
    : trigger_pin(trigger_pin),
      echo_pin(echo_pin),
      distance_threshold(distance_threshold) {
    ESP_LOGI(TAG, "Starting With Custom Values");
}

void DistanceSensor::setup() {
    ESP_LOGI(TAG, "Setting Up Distance Sensor");
    pinMode(trigger_pin, OUTPUT);
    pinMode(echo_pin, INPUT);
    digitalWrite(trigger_pin, LOW);
}

uint32_t DistanceSensor::getDistanceInCm() {
    digitalWrite(trigger_pin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigger_pin, LOW);

    const auto duration = pulseIn(echo_pin, HIGH);
    const auto distance = duration * FACTOR;
    ESP_LOGI(TAG, "Distance: %lf cm", distance);
    return static_cast<uint32_t>(distance);
}

bool DistanceSensor::isPresenceDetected() {
    return getDistanceInCm() < distance_threshold;
}

/*
void DistanceSensor::waitForPresence() {
    ESP_LOGI(TAG, "Waiting For Presence");
    while (!isPresenceDetected()) {
        delay(TIME_BETWEEN_DISTANCE_MEASUREMENTS_MS);
    }
    ESP_LOGI(TAG, "Presence Detected");
}
*/

void DistanceSensor::waitUntil(bool presenceDetected) {
    ESP_LOGI(TAG, "Waiting Until Presence Detected: %d", presenceDetected);
    while (isPresenceDetected() != presenceDetected) {
        delay(TIME_BETWEEN_DISTANCE_MEASUREMENTS_MS);
    }
    ESP_LOGI(TAG, "Presence Detected: %d", presenceDetected);
}
