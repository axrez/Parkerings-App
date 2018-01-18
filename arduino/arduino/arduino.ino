#include <Servo.h>
Servo myServo;

const int trigPin = 6;
const int echoPin = 7;
const int servoStop = 1516;
const int servoCWSlow = 1507;
const int servoCWFast = 1487;
const int servoCCWSlow = 1530;
const int servoCCWFast = 1550;


int i;
int threshold = 350;
volatile bool clockWise = true;
long duration, duration1, distance;
char inChar = Serial.read();

bool sending = true;

void setup() {
  // put your setup code here, to run once:
  myServo.attach(3);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  switch (inChar) {
    case 'c':
      sending = true;
      break;
    case 'x':
      sending = false;
      break;
  }
  
  if(clockWise == true){
    myServo.writeMicroseconds(servoCWFast);
    readDistance();
    duration = readDistance();
    distance = (duration/2)/29.1;
    if(duration <= threshold){
        delay(100);
        servoCalibrate();
    } 
  }
  if(clockWise == false){
    //for(int i = 0; i >= 100; i++){ 
      myServo.writeMicroseconds(servoCCWFast);
      delay(100);
      myServo.writeMicroseconds(servoStop);
      delay(1000);
      readDistance();
      duration = readDistance();
      distance = (duration/2)/29.1;
      if(sending){
        Serial.println(duration);
      }
      if(duration <= threshold){
        //delay(100);
        servoCalibrate();
    }
  //}
  }
}

long readDistance(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin,LOW);
  duration = pulseIn(echoPin, HIGH);
  return duration;
}

void servoCalibrate(){
  if(clockWise == true){
    myServo.writeMicroseconds(servoCWSlow);
    delay(1000);
    myServo.writeMicroseconds(servoStop);
    delay(1000);
    readDistance();
    if(readDistance() <= threshold){
      clockWise = !clockWise;
      myServo.writeMicroseconds(servoCCWSlow);
      delay(500);
      myServo.writeMicroseconds(servoCCWFast);
      delay(100);
      if(sending){
        Serial.println(999999);
      } 
    }
  } 
  if(clockWise == false){
    myServo.writeMicroseconds(servoCCWSlow);
    delay(1000);
    myServo.writeMicroseconds(servoStop);
    delay(1000);
    readDistance();
    if(readDistance() <= threshold){
      clockWise = !clockWise;
      //i = 100;
      myServo.writeMicroseconds(servoCWSlow);
      delay(1000);
      myServo.writeMicroseconds(servoCWFast);
      delay(500);
      if(sending){
        Serial.println(888888);
      }
    }
  }  
}
