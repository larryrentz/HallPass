
#include <Servo.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

// If using the breakout with SPI, define the pins for SPI communication.
#define PN532_SCK  (2)
#define PN532_MOSI (3)
#define PN532_SS   (4)
#define PN532_MISO (5)

// If using the breakout or shield with I2C, define just the pins connected
// to the IRQ and reset lines.  Use the values below (2, 3) for the shield!
#define PN532_IRQ   (2)
#define PN532_RESET (3)  // Not connected by default on the NFC Shield

// Uncomment just _one_ line below depending on how your breakout or shield
// is connected to the Arduino:

// Use this line for a breakout with a SPI connection:
Adafruit_PN532 nfc(PN532_SCK, PN532_MISO, PN532_MOSI, PN532_SS);

// Use this line for a breakout with a hardware SPI connection.  Note that
// the PN532 SCK, MOSI, and MISO pins need to be connected to the Arduino's
// hardware SPI SCK, MOSI, and MISO pins.  On an Arduino Uno these are
// SCK = 13, MOSI = 11, MISO = 12.  The SS line can be any digital IO pin.
//Adafruit_PN532 nfc(PN532_SS);

// Or use this line for a breakout or shield with an I2C connection:
//Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);

#if defined(ARDUINO_ARCH_SAMD)
// for Zero, output on USB Serial console, remove line below if using programming port to program the Zero!
// also change #define in Adafruit_PN532.cpp library file
   #define Serial SerialUSB
#endif

Servo myservo;  

int servo = 9;    // variable to store the servo position
int buzzer = 10;
int locked = 0;
int NFCState = 0;
int lastNFCState = 0;
int pos = 90;
int counter = 0;

void setup() {
  myservo.attach(servo);  // attaches the servo on pin 9 to the servo object
 // Serial.begin(115200);
 // Serial.println("Hello!");
nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    //Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  // Got ok data, print it out!
 // Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
 // Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
 // Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  
  // configure board to read RFID tags
  nfc.SAMConfig();
  
  //Serial.println("Waiting for an ISO14443A Card ...");
 // myservo.write(5);
}

void loop()
{
  
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
    
  // Wait for an ISO14443A type cards (Mifare, etc.).  When one is found
  // 'uid' will be populated with the UID, and uidLength will indicate
  // if the uid is 4 bytes (Mifare Classic) or 7 bytes (Mifare Ultralight)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

   if (success)
   {       
          counter++;
          // Display some basic information about the card
          
           myservo.write(5);
           
           locked =1;
           tone(buzzer, 450);
           delay(50);
           noTone(buzzer);
           delay(100);
           tone(buzzer, 450);
           delay(50);
           noTone(buzzer);
           delay(100);
           
   } 
 delay (1000); 
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

   if (success)
   {       
          counter++;
          // Display some basic information about the card
          
           myservo.write(pos);
           
           locked =1;
           tone(buzzer, 450);
           delay(50);
           noTone(buzzer);
           delay(100);
           tone(buzzer, 450);
           delay(50);
           noTone(buzzer);
           delay(100);
           
   } 
}
 
 

   
  
