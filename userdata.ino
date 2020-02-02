#include <ArduinoBLE.h>

 // BLE Battery Service
BLEService userData("181C");

// BLE Battery Level Characteristic
BLECharacteristic nameCharacteristic("2A8A", BLERead | BLENotify, "James"); //name
BLECharacteristic lastnameCharacteristic("2A90", BLERead | BLENotify, "Doe"); //lastname
BLECharacteristic locationnameCharacteristic("2AB5", BLERead | BLENotify, "Cafeteria"); //position
BLECharacteristic useridCharacteristic("2A3D", BLERead | BLENotify, "9th Grade - ID: 00123"); //user id


void setup() {
  Serial.begin(9600);    // initialize serial communication
  while (!Serial);

  pinMode(LED_BUILTIN, OUTPUT); // initialize the built-in LED pin to indicate when a central is connected

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");

    while (1);
  }
  /* Set a local name for the BLE device
     This name will appear in advertising packets
     and can be used by remote devices to identify this BLE device
     The name can be changed but maybe be truncated based on space left in advertisement packet
  */
  
  BLE.setLocalName("Student Info");
  BLE.setAdvertisedService(userData); // add the service UUID
  userData.addCharacteristic(nameCharacteristic); // add the battery level characteristic
  userData.addCharacteristic(lastnameCharacteristic); // add the battery level characteristic
  userData.addCharacteristic(locationnameCharacteristic); // add the battery level characteristic
  userData.addCharacteristic(useridCharacteristic); // add the battery level characteristic
 
  BLE.addService(userData); // Add the battery service
  nameCharacteristic.writeValue("James"); // set initial value for this characteristic
  //BLEDescriptor nameDescriptor("2902", "millis");
  
 userData.addCharacteristic(lastnameCharacteristic); // add the battery level characteristic
  lastnameCharacteristic.writeValue("Doe"); // set initial value for this characteristic
  
  userData.addCharacteristic(locationnameCharacteristic); // add the battery level characteristic
  locationnameCharacteristic.writeValue("Cafeteria"); // set initial value for this characteristic
  
  userData.addCharacteristic(useridCharacteristic); // add the battery level characteristic
  useridCharacteristic.writeValue("9th Grade - ID: 00123"); // set initial value for this characteristic

  /* Start advertising BLE.  It will start continuously transmitting BLE
     advertising packets and will be visible to remote BLE central devices
     until it receives a new connection */

  // start advertising
  BLE.advertise();

  Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() {
  // wait for a BLE central
  BLEDevice central = BLE.central();

  // if a central is connected to the peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's BT address:
    Serial.println(central.address());
    // turn on the LED to indicate the connection:
    digitalWrite(LED_BUILTIN, HIGH);

   
    // when the central disconnects, turn off the LED:
    digitalWrite(LED_BUILTIN, LOW);
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}
