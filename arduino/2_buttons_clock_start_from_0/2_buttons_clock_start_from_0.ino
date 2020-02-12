#include <RTCZero.h>
RTCZero rtc; // CREATE AN RTC OBJECT

const int buttonPin0 = 0; // SET BUTTON
const int buttonPin1 = 1; // CHANGE BUTTON
int buttonState0 = 0;
int buttonState1 = 0;
int pstate0 = 0;
int pstate1 = 0;
int state0 = 0;
int state1 = 0;

int secs = 0;
int mins = 0;
int hrs = 0;

void setup() {
  rtc.begin(); // initialize RTC
  rtc.setHours(hrs);
  rtc.setMinutes(mins);
  rtc.setSeconds(secs);

  Serial.begin(9600);
  pinMode(buttonPin0, INPUT);
  pinMode(buttonPin1, INPUT);
}

void loop() {
  if (hrs >22) {
    hrs = -1;
  }

  if (mins >58) {
    mins = -1;
  }
  
  buttonState0 = digitalRead(buttonPin0);
  buttonState1 = digitalRead(buttonPin1);

  // detect when 'set button' is pushed and change state
  if (buttonState0 == HIGH && pstate0 == 0) {
    state0++;
    delay(10);
  }

  // if 'set button' is higher than 2, reset
  if (state0 > 2) {
    state0 = 0;
    rtc.setSeconds(0);
  }

  // start setting clock
  // setting hour
  if (buttonState1 == HIGH && pstate1 == 0 && state0 == 1) {
    hrs++;
    rtc.setHours(hrs);
   
  }
  // setting minute
  if (buttonState1 == HIGH && pstate1 == 0 && state0 == 2) {
    mins++;
    rtc.setMinutes(mins);
  
  }
  // setting seconds
  if (buttonState1 == HIGH && pstate1 == 0 && state0 == 3) {
    secs++;
    rtc.setSeconds(secs);

  }
hrs = rtc.getHours();
mins = rtc.getMinutes();
secs = rtc.getSeconds();

  pstate0 = buttonState0;
  pstate1 = buttonState1;

  //  Serial.print("state: ");
  //  Serial.print(state0);

//  if (state0 == 1) {
//    Serial.print("   setting hours ");
//  } else if (state0 == 2) {
//    Serial.print("   setting minutes ");
//  } else if (state0 == 3) {
//    Serial.print("   setting seconds ");
//  } else {
//    Serial.print("   neutral state ");
//  }
//
//  print2digits(rtc.getHours());
//  Serial.print(":");
//  print2digits(rtc.getMinutes());
//  Serial.print(":");
//  print2digits(rtc.getSeconds());
//
//  Serial.println();
//  delay(10);

Serial.print(state0);

    Serial.print(",");
    print2digits(hrs);
  
    Serial.print(",");
    print2digits(mins);
  
    Serial.print(",");
    Serial.println(secs);

    delay(10);
}

void print2digits(int number) {
  if (number < 10) {
    Serial.print("0"); // print a 0 before if the number is < than 10
  }
  Serial.print(number);
}
