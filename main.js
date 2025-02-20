let body = new Object();

let buttonResult = document.getElementById("result");

function build(a) {
  // Выбор рода тяги
  a.rodTagi = new Object();
  a.rodTagi.name = document.getElementById("rodTagi-list").value;

  // Внешнее электроснабжение
  a.vneshneeEletrosnabzhenie = new Object();
  a.vneshneeEletrosnabzhenie.vidIsochnikaOsnovnoy = document.getElementById(
    "vid-istochnika-osnovnoy"
  ).value;
  a.vneshneeEletrosnabzhenie.voltageOsnovnoy = Number(
    document.getElementById("voltage-onovnoy").value
  );
  a.vneshneeEletrosnabzhenie.vidIsochnikaReserv = document.getElementById(
    "vid-istochnika-reserv"
  ).value;
  a.vneshneeEletrosnabzhenie.voltageReserv = Number(
    document.getElementById("voltage-reserv").value
  );

  // Характеристика станции
  a.station = new Object();
  a.station.drive = Number(document.getElementById("drive").value);
  a.station.dualDrive = Number(document.getElementById("dual-drive").value);
  if (document.getElementById("dual-ways").value == "+") {
    a.station.dualWays = true;
  } else {
    a.station.dualWays = false;
  }
  a.station.numberOfLines = Number(
    document.getElementById("number-of-lines").value
  );
  if (document.getElementById("stop-device").value == "+") {
    a.station.stopDevice = true;
  } else {
    a.station.stopDevice = false;
  }
  if (document.getElementById("manevor-work").value == "+") {
    a.station.manevorWork = true;
  } else {
    a.station.manevorWork = false;
  }
  if (document.getElementById("pereezdnaya-signalitation").value == "+") {
    a.station.pereezdnayaSignalitation = true;
  } else {
    a.station.stopDpereezdnayaSignalitationevice = false;
  }
  a.station.numberApproaches = Number(
    document.getElementById("number-approaches").value
  );
  a.station.entranceSignal = Number(
    document.getElementById("entrance-signal").value
  );
  a.station.departureSignal = Number(
    document.getElementById("departure-signal").value
  );
  a.station.shuntingDwarf = Number(
    document.getElementById("shunting-dwarf").value
  );
  a.station.garantePowerDevice = new Object();
  a.station.garantePowerDevice.power = Number(
    document.getElementById("device-power").value
  );
  a.station.garantePowerDevice.cos = Number(
    document.getElementById("device-cos").value
  );
  a.station.routeSigns = document.getElementById("route-signs").value;
  a.station.routeSignsNumbers = Number(
    document.getElementById("number-of-route-signs").value
  );
  if (document.getElementById("dispecher-control").value == "+") {
    a.station.dispecherControl = true;
  } else {
    a.station.dispecherControl = false;
  }
  if (document.getElementById("snow-drift").value == "+") {
    a.station.snowDrift = true;
  } else {
    a.station.snowDrift = false;
  }
  a.station.climateZone = document.getElementById("climate-zone").value;

  // Гарантированные и не гарантированные нагрузки
  a.garantAndNotgarantLoad = new Object();
  a.garantAndNotgarantLoad.connection = Number(
    document.getElementById("connection-input").value
  );
  a.garantAndNotgarantLoad.lightRelay = Number(
    document.getElementById("light-relay").value
  );
  a.garantAndNotgarantLoad.conditionalDevice = Number(
    document.getElementById("conditional-device").value
  );
  a.garantAndNotgarantLoad.heatingDga = Number(
    document.getElementById("heating-dga").value
  );
  a.garantAndNotgarantLoad.totalLights = Number(
    document.getElementById("total-lights").value
  );
  a.garantAndNotgarantLoad.powerEquipment = Number(
    document.getElementById("power-equipment").value
  );
}

// Проверка, все ли поля заполнены
function inputEmpty() {
  let input = document.getElementsByTagName("input");
  for (let i = 0; i < input.length; i++) {
    if (input[i].value == "") {
      alert("Вы не заполнили все поля");
      break;
    }
  }
}

body.mathload = new Object();

// Расчет мощности нагрузок бесперебойного питания
function mathLoad(element) {
  // Signals data
  const entranceSignalP = 31, entranceSignalQ = 11.3, entranceSignalS = 33;
  const depart_manSignalP = 21, depart_manSignalQ = 6.8, depart_manSignalS = 22;
  const lampsPS = 25;
  const lightDiodPS = 15;
  const rta1P = 228, rta1Q = 46.2, rta1S = 232.6;
  const heatingP = 30, heatingQ = 8.8, heatingS = 31.3;
  const lightsPS = 115;

  // math enterece
  element.mathload.entranceSignalTotalP =  entranceSignalP * element.station.entranceSignal;
  element.mathload.entranceSignalTotalQ = entranceSignalQ * element.station.entranceSignal;
  element.mathload.entranceSignalTotalS = entranceSignalS * element.station.entranceSignal;

  // math depart_manSignal
  element.mathload.depart_manSignalTotalP = depart_manSignalP * (element.station.departureSignal + element.station.shuntingDwarf);
  element.mathload.depart_manSignalTotalQ = depart_manSignalQ * (element.station.departureSignal + element.station.shuntingDwarf);
  element.mathload.depart_manSignalTotalS = depart_manSignalS * (element.station.departureSignal + element.station.shuntingDwarf);

  // math signals 
  if (element.station.routeSigns == "Светодиодные") {
    element.mathload.lightDiodTotalPS = lightDiodPS * element.station.routeSignsNumbers;
    // console.log(lightDiodPS, element.station.routeSignsNumbers, element.mathLoad.lightDiodTotalPS);
    
  } else {
    element.mathload.lampsTotalPS = lampsPS * element.station.routeSignsNumbers;
  }

  // math rta1
  element.mathload.rta1TotalP = rta1P * element.station.numberApproaches;
  element.mathload.rta1TotalQ = rta1Q * element.station.numberApproaches;
  element.mathload.rta1TotalS = rta1S * element.station.numberApproaches;

  // math heating
  element.mathload.haetingTotalP = heatingP * element.station.numberApproaches;
  element.mathload.haetingTotalQ = heatingQ * element.station.numberApproaches;
  element.mathload.haetingTotalS = heatingS * element.station.numberApproaches;
  
  // math chto-to
  element.mathload.lightTotalP = lightsPS
  element.mathload.lightTotalS = lightsPS;
}

// Расчет рельсовой цепи с преобразователями частоты 25 Гц.
body.mathrelay = new Object();
function mathRelay(element) {
  // Relay data
  const localElement_P = 2.44, localElement_Q = 7.5, localElement_S = 7.9;

  element.mathrelay.localElement_TotalP = localElement_P * (element.station.numberOfLines + 2 * element.station.drive);
  element.mathrelay.localElement_TotalQ = localElement_Q * (element.station.numberOfLines + 2 * element.station.drive);
  element.mathrelay.localElement_TotalS = localElement_S * (element.station.numberOfLines + 2 * element.station.drive);

  if (element.rodTagi.name == "Электрическая переменного тока") {
    const elTagaPerem_P = 31.5, elTagaPerem_Q = 14.8, elTagaPerem_S = 34.8;

    element.mathrelay.elTagaPerem_TotalP =  elTagaPerem_P * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.elTagaPerem_TotalQ =  elTagaPerem_Q * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.elTagaPerem_TotalS =  elTagaPerem_S * (element.station.numberOfLines + element.station.drive);
  } else if (element.rodTagi.name == "Электрическая постоянного тока") {
    const elTagaPost_P = 17.2, elTagaPost_Q = 12.2, elTagaPost_S = 21.1;
    
    element.mathrelay.elTagaPost_TotalP =  elTagaPost_P * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.elTagaPost_TotalQ =  elTagaPost_Q * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.elTagaPost_TotalS =  elTagaPost_S * (element.station.numberOfLines + element.station.drive);    
  } else if (element.rodTagi.name == "Автономная") {
    const automatic_P = 16.8, automatic_Q = 7.85, automatic_S = 18.54;

    element.mathrelay.automatic_TotalP = automatic_P * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.automatic_TotalQ = automatic_Q * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.automatic_TotalS = automatic_S * (element.station.numberOfLines + element.station.drive);
    
  }
}

buttonResult.addEventListener("click", () => {
  // inputEmpty();
  build(body);
  mathLoad(body);
  mathRelay(body);
  console.log(body);
});

// Do something
