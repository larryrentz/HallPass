#include <ArduinoBLE.h>
BLEService studentService("1101");
BLECharacteristic studentName("2101", BLERead | BLENotify,"Larry Rentz");
BLECharacteristic studentGrade("2102", BLERead | BLENotify,"5th Grade");
BLECharacteristic studentID("2103", BLERead | BLENotify, "11234");

void setup() 
{
  Serial.begin(9600);
  while (!Serial);

  pinMode(LED_BUILTIN, OUTPUT);
  if (!BLE.begin()) 
  {
    Serial.println("starting BLE failed!");
    while (1);
  }

    BLE.setLocalName("Student Info");
    BLE.setAdvertisedService(studentService);
    studentService.addCharacteristic(studentName);
    studentService.addCharacteristic(studentGrade);
    studentService.addCharacteristic(studentID);
    BLE.addService(studentService);

    BLE.advertise();
    Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() 
{
    BLEDevice central = BLE.central();

    if (central) 
    {
      Serial.print("Connected to central: ");
      Serial.println(central.address());
      digitalWrite(LED_BUILTIN, HIGH);
/*
while (central.connected()) {

  int battery = analogRead(A0);
  //int batteryLevel = map(battery, 0, 1023, 0, 100);
  String names = "hey";
  Serial.print("Battery Level % is now: ");
  Serial.println(batteryLevel);
  batteryLevelCha.writeValue(batteryLevel);
  delay(200);

}
*/
    }
    digitalWrite(LED_BUILTIN, LOW);
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
}
