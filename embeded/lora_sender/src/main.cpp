#include <Arduino.h>
#include <LoRaMESH.h>

uint16_t local_id, local_net;
uint32_t local_unique_id;

void setup() {
    Serial.begin(115200);
    SerialCommandsInit(9600);
    const auto status = LocalRead(&local_id, &local_net, &local_unique_id);
    Serial.printf("Status: %d\n", status);
    if (status == MESH_OK) {
        Serial.printf("Local ID: %d\n", local_id);
        Serial.printf("Local NET: %d\n", local_net);
        Serial.printf("Local Unique ID: %d\n", local_unique_id);
    } else {
        Serial.println("Error reading local info");
    }
}

void loop() {
}