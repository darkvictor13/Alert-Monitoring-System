#include <Arduino.h>

class DistanceSensor {
    private:
        const uint8_t trigger_pin;
        const uint8_t echo_pin;

        uint16_t distance_threshold;

    public:
        DistanceSensor();
        DistanceSensor(const uint8_t trigger_pin, const uint8_t echo_pin,
                       const uint16_t distance_threshold);

        void setup();
        uint32_t getDistanceInCm();
        bool isPresenceDetected();
        void waitUntil(bool presenceDetected);
};