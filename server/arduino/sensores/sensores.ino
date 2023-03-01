#include <ArduinoJson.h>
#include <ArduinoJson.hpp>
#define DEBUG(a) Serial.println(a);
#include <DHT.h>
#include <DHT_U.h>

//Definimos le pin digital
#define DHTPIN1 2
#define DHTPIN2 3
//Dependiendo del tipo de sensor 
#define DHTTYPE DHT11

DHT dht1(DHTPIN1, DHTTYPE);
DHT dht2(DHTPIN2, DHTTYPE);

float anteriort1 = 0;
float anteriorh1 = 0;
float anteriort2 = 0;
float anteriorh2 = 0;
float alerta = 50;
bool estado1 = false;
bool estado2 = false;
void setup() {
  // put your setup code here, to run once:
  //iniciamos la comunicacion serial
  Serial.begin(9600);
  
  //Inicalizamos el sensor
  dht1.begin();
  dht2.begin();
}

void loop() {
   // put your main code here, to run repeatedly:
   // Allocate the JSON document
  //
  if (Serial.available() > 0)
   {
      String str = Serial.readStringUntil('\n');
      alerta = str.toFloat();
      //DEBUG(alerta);
   }
  // Inside the brackets, 200 is the RAM allocated to this document.
  StaticJsonDocument<200> doc;
  StaticJsonDocument<200> doc2;
  

   // Add values in the document
  //
  doc["sensor"] = 1;
  doc["alerta"]= estado1;
  doc["valert"]=alerta;
  doc2["sensor"]= 2;
  doc2["alerta"]=estado2;
  doc2["valert"]=alerta;
  
 
  delay(7000);
  //leemos la humedad relativa
  float actualh1 = dht1.readHumidity();
  float actualh2 = dht2.readHumidity();
  //leemos la temperatura en grados centigrados por defecto
  float actualt1 = dht1.readTemperature();
  float actualt2 = dht2.readTemperature();

  if (isnan(actualh1) || isnan(actualt1)) {
    Serial.println("Error obteniendo los datos del sensor 1 DHT11");
    return;
  }
   if (isnan(actualh2) || isnan(actualt2)) {
    Serial.println("Error obteniendo los datos del sensor 2 DHT11");
    return;
  }

  // Add an array.
  //
  JsonArray data = doc.createNestedArray("lectura");
  data.add(actualh1);
  data.add(actualt1);

   JsonArray data2 = doc2.createNestedArray("lectura");
  data2.add(actualh2);
  data2.add(actualt2);
  

 
  // Se envian los datos solo cuando la lectura es diferente 
  if(actualt1 >= alerta){
        estado1 = true;
        serializeJson(doc, Serial); 
        Serial.print("\n");
      }else{
        estado2 = false;
      
   serializeJson(doc, Serial); // Generate the prettified JSON and send it to the Serial port.
   Serial.print("\n");
  anteriorh1= actualh1;
  anteriort1 = actualt1;
      }


if(actualt2 >= alerta){
        estado2 = true;
        serializeJson(doc2, Serial);
        Serial.print("\n"); 
      }else{
        estado2 = false;
  
      
  serializeJson(doc2, Serial);
  Serial.print("\n");
  anteriorh2= actualh2;
  anteriort2 = actualt2;}
    

    /* Serial.print("{\"sensor\":");
      Serial.print( 84.5 );
      Serial.print("}\n"); */
}
  
  

