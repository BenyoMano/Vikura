@echo OFF
CD..
CD utveckling\reactnative\Vikura
CD
:begin
CHOICE /M "Start Visual Studio?"
IF %ERRORLEVEL% ==1 start code .
CHOICE /M "Go to Firestore and Notion?"
IF %ERRORLEVEL% ==1 start msedge.exe https://console.firebase.google.com/project/omnitalk-7d2dc/firestore/data/~2FUsers~2F39juQJoufKaK0ALdpmmrvupgEmM2 https://www.notion.so/Tidsplanering-c4205fcb74cc4e1c8f9ebac7cccdaabb
CHOICE /M "Run react-native run-android?"
IF %ERRORLEVEL% ==1 react-native run-android
CHOICE /M "Run again?"
IF %ERRORLEVEL% ==1 goto begin
IF %ERRORLEVEL% ==2 exit

