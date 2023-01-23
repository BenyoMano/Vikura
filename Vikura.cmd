@echo OFF
CD
:begin
CHOICE /M "Start Visual Studio?"
IF %ERRORLEVEL% ==1 start code .
CHOICE /M "Go to Firestore and Notion?"
IF %ERRORLEVEL% ==1 start chrome.exe https://console.firebase.google.com/project/omnitalk-7d2dc/firestore/data/~2FUsers~2F39juQJoufKaK0ALdpmmrvupgEmM2 https://www.notion.so/58653da3f57f4be2aebcaf23300eefef?v=363cf4f8cfb94f738053b2da152ef231
CHOICE /M "Run react-native run-android?"
IF %ERRORLEVEL% ==1 react-native run-android
CHOICE /M "Run again?"
IF %ERRORLEVEL% ==1 goto begin
IF %ERRORLEVEL% ==2 exit

