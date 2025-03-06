const deviceCos = document.getElementById("device-cos");

let body = new Object();

const buttonResult = document.getElementById("result");

const tableResult = document.getElementById("tableResult");

// Создание объекта который хранит данные которые ввел пользователь на самом сайте
function build(params) {
  // Выбор рода тяги
  params.rodTagi = new Object();
  params.rodTagi.name = document.getElementById("rodTagi-list").value;

  // Внешнее электроснабжение
  params.vneshneeEletrosnabzhenie = new Object();
  params.vneshneeEletrosnabzhenie.vidIsochnikaOsnovnoy =
    document.getElementById("vid-istochnika-osnovnoy").value;
  params.vneshneeEletrosnabzhenie.voltageOsnovnoy = Number(
    document.getElementById("voltage-onovnoy").value
  );
  params.vneshneeEletrosnabzhenie.vidIsochnikaReserv = document.getElementById(
    "vid-istochnika-reserv"
  ).value;
  params.vneshneeEletrosnabzhenie.voltageReserv = Number(
    document.getElementById("voltage-reserv").value
  );

  // Характеристика станции
  params.station = new Object();
  params.station.drive = Number(document.getElementById("drive").value);
  params.station.dualDrive = Number(
    document.getElementById("dual-drive").value
  );
  if (document.getElementById("dual-ways").value == "+") {
    params.station.dualWays = true;
  } else {
    params.station.dualWays = false;
  }
  params.station.numberOfLines = Number(
    document.getElementById("number-of-lines").value
  );
  if (document.getElementById("stop-device").value == "+") {
    params.station.stopDevice = true;
  } else {
    params.station.stopDevice = false;
  }
  if (document.getElementById("manevor-work").value == "+") {
    params.station.manevorWork = true;
  } else {
    params.station.manevorWork = false;
  }
  if (document.getElementById("pereezdnaya-signalitation").value == "+") {
    params.station.pereezdnayaSignalitation = true;
  } else {
    params.station.pereezdnayaSignalitation = false;
  }
  params.station.numberApproaches = Number(
    document.getElementById("number-approaches").value
  );
  params.station.entranceSignal = Number(
    document.getElementById("entrance-signal").value
  );
  params.station.departureSignal = Number(
    document.getElementById("departure-signal").value
  );
  params.station.shuntingDwarf = Number(
    document.getElementById("shunting-dwarf").value
  );
  params.station.garantePowerDevice = new Object();
  params.station.garantePowerDevice.power = Number(
    document.getElementById("device-power").value
  );
  params.station.garantePowerDevice.cos = Number(deviceCos.value);
  params.station.routeSigns = document.getElementById("route-signs").value;
  params.station.routeSignsNumbers = Number(
    document.getElementById("number-of-route-signs").value
  );
  if (document.getElementById("dispecher-control").value == "+") {
    params.station.dispecherControl = true;
  } else {
    params.station.dispecherControl = false;
  }
  if (document.getElementById("snow-drift").value == "+") {
    params.station.snowDrift = true;
  } else {
    params.station.snowDrift = false;
  }
  params.station.climateZone = document.getElementById("climate-zone").value;

  // Гарантированные и не гарантированные нагрузки
  params.garantAndNotgarantLoad = new Object();
  params.garantAndNotgarantLoad.connection = Number(
    document.getElementById("connection-input").value
  );
  params.garantAndNotgarantLoad.lightRelay = Number(
    document.getElementById("light-relay").value
  );
  params.garantAndNotgarantLoad.conditionalDevice = Number(
    document.getElementById("conditional-device").value
  );
  params.garantAndNotgarantLoad.heatingDga = Number(
    document.getElementById("heating-dga").value
  );
  params.garantAndNotgarantLoad.totalLights = Number(
    document.getElementById("total-lights").value
  );
  params.garantAndNotgarantLoad.powerEquipment = Number(
    document.getElementById("power-equipment").value
  );
}

// Проверка, все ли поля заполнены
function inputEmpty() {
  let inputCount = 0; // Подсчет пустых полей
  let input = document.getElementsByTagName("input");
  for (let i = 0; i < input.length; i++) {
    if (input[i].value == "") {
      // alert("Вы не заполнили все поля");s
      input[i].classList.add("errorInput");
      inputCount++;
      // break;
    } else {
      input[i].classList.remove("errorInput");
    }
  }
  // console.log(inputCount); // Проверка значения переменной inputCount

  if (inputCount == 0) {
    return false;
  } else {
    return true;
  }
}
let empty;

let errors = [];
const errorWindow = document.getElementById("error-window");
function countError() {
  const errorWindowList = document.querySelectorAll(".error-window__list");
  if (errorWindowList.length >= 1) {
    for (let i = 0; i < errorWindowList.length; i++) {
      errorWindowList[i].remove();
    }
  }
  const ol = document.createElement("ol");
  errorWindow.appendChild(ol);
  let pointOfList = document.getElementsByClassName(
    "error-window__list__point"
  );
  for (let i = 0; i < pointOfList.length; i++) {
    pointOfList[i].remove();
  }
  if (empty) {
    errors.push("Есть пустые поля");
  }
  if (deviceCos.value > 1) {
    errors.push("Значение cos φ не может быть больше 1.");
  }
  for (let i = 0; i < errors.length; i++) {
    ol.classList.add("error-window__list");
    const li = document.createElement("li");
    li.textContent = errors[i];
    li.classList.add("error-window__list__point");
    ol.appendChild(li);
  }
}

// Расчет мощности нагрузок бесперебойного питания
function mathLoad(params) {
  // Signals data
  params.mathload = new Object();
  const entranceSignalP = 31,
    entranceSignalQ = 11.3,
    entranceSignalS = 33,
    depart_manSignalP = 21,
    depart_manSignalQ = 6.8,
    depart_manSignalS = 22,
    rta1P = 228,
    rta1Q = 46.2,
    rta1S = 232.6,
    heatingP = 30,
    heatingQ = 8.8,
    heatingS = 31.3,
    lightsPS = 115;
  params.mathload.lampsPS = 25;
  params.mathload.lightDiodPS = 15;

  // math enterece
  params.mathload.entranceSignalTotalP =
    entranceSignalP * params.station.entranceSignal;
  params.mathload.entranceSignalTotalQ =
    entranceSignalQ * params.station.entranceSignal;
  params.mathload.entranceSignalTotalS =
    entranceSignalS * params.station.entranceSignal;

  // math depart_manSignal
  params.mathload.departManSignal =
    params.station.departureSignal + params.station.shuntingDwarf;
  params.mathload.departManSignalTotalP =
    depart_manSignalP * params.mathload.departManSignal;
  params.mathload.departManSignalTotalQ =
    depart_manSignalQ * params.mathload.departManSignal;
  params.mathload.departManSignalTotalS =
    depart_manSignalS * params.mathload.departManSignal;

  // math signals
  if (params.station.routeSigns == "Светодиодные") {
    params.mathload.lightDiodTotalPS =
      params.mathload.lightDiodPS * params.station.routeSignsNumbers;
    // console.log(lightDiodPS, params.station.routeSignsNumbers, params.mathLoad.lightDiodTotalPS);
  } else {
    params.mathload.lampsTotalPS =
      params.mathload.lampsPS * params.station.routeSignsNumbers;
  }

  // math rta1
  params.mathload.rta1TotalP = rta1P * params.station.numberApproaches;
  params.mathload.rta1TotalQ = rta1Q * params.station.numberApproaches;
  params.mathload.rta1TotalS = rta1S * params.station.numberApproaches;

  // math heating
  params.mathload.haetingTotalP = heatingP * params.station.numberApproaches;
  params.mathload.haetingTotalQ = heatingQ * params.station.numberApproaches;
  params.mathload.haetingTotalS = heatingS * params.station.numberApproaches;

  // math chto-to
  params.mathload.lightTotalP = lightsPS;
  params.mathload.lightTotalS = lightsPS;
  console.log("mathload");

  for (const key in params.mathload) {
    if (Object.prototype.hasOwnProperty.call(params.mathload, key)) {
      params.mathload[key] = Math.round(params.mathload[key] * 100) / 100;
      // console.log(obj);
    }
  }
}

// Расчет рельсовой цепи с преобразователями частоты 25 Гц.
function mathRelay(params) {
  // Relay data
  params.mathrelay = new Object();
  const localElement_P = 2.44,
    localElement_Q = 7.5,
    localElement_S = 7.9,
    powerLocalConvertor = 300,
    powerWaysConvertor = 280;

  params.mathrelay.localElementNumber =
    params.station.numberOfLines + 2 * params.station.drive;
  params.mathrelay.localElement_TotalP =
    localElement_P * params.mathrelay.localElementNumber;
  params.mathrelay.localElement_TotalQ =
    localElement_Q * params.mathrelay.localElementNumber;
  params.mathrelay.localElement_TotalS =
    localElement_S * params.mathrelay.localElementNumber;
  params.mathrelay.powerWaysTransformator = Math.sqrt(
    params.mathrelay.localElement_TotalP ** 2 +
      params.mathrelay.localElement_TotalQ ** 2
  );
  params.mathrelay.numberLocal =
    Math.ceil(params.mathrelay.localElement_TotalS / powerLocalConvertor);
  params.mathrelay.numberWays =
    Math.ceil(params.mathrelay.powerWaysTransformator / powerWaysConvertor);

  params.mathrelay.tagaNumber =
    params.station.numberOfLines + params.station.drive;

  if (params.rodTagi.name == "Электрическая переменного тока") {
    // Значения если род тяги "Электрическая переменного тока"
    const elTagaPerem_P = 31.5,
      elTagaPerem_Q = 14.8,
      elTagaPerem_S = 34.8;

    params.mathrelay.taga_TotalP = elTagaPerem_P * params.mathrelay.tagaNumber;
    params.mathrelay.taga_TotalQ = elTagaPerem_Q * params.mathrelay.tagaNumber;
    params.mathrelay.taga_TotalS = elTagaPerem_S * params.mathrelay.tagaNumber;
  } else if (params.rodTagi.name == "Электрическая постоянного тока") {
    // Значения если род тяги "Электрическая постоянного тока"
    const elTagaPost_P = 17.2,
      elTagaPost_Q = 12.2,
      elTagaPost_S = 21.1;

    params.mathrelay.taga_TotalP = elTagaPost_P * params.mathrelay.tagaNumber;
    params.mathrelay.taga_TotalQ = elTagaPost_Q * params.mathrelay.tagaNumber;
    params.mathrelay.taga_TotalS = elTagaPost_S * params.mathrelay.tagaNumber;
  } else if (params.rodTagi.name == "Автономная") {
    // Значения если род тяги "Автономная"
    const automatic_P = 16.8,
      automatic_Q = 7.85,
      automatic_S = 18.54;

    params.mathrelay.taga_TotalP = automatic_P * params.mathrelay.tagaNumber;
    params.mathrelay.taga_TotalQ = automatic_Q * params.mathrelay.tagaNumber;
    params.mathrelay.taga_TotalS = automatic_S * params.mathrelay.tagaNumber;
  }

  params.mathrelay.relayCircutAntiphaseP = 860;
  params.mathrelay.relayCircutAntiphaseQ = 1140;
  params.mathrelay.relayCircutAntiphaseS = 1430;
  params.mathrelay.relayCircutAntiphase_TotalP = params.mathrelay.relayCircutAntiphaseP * params.station.dualDrive;
  params.mathrelay.relayCircutAntiphase_TotalQ = params.mathrelay.relayCircutAntiphaseQ * params.station.dualDrive;;
  params.mathrelay.relayCircutAntiphase_TotalS = params.mathrelay.relayCircutAntiphaseS * params.station.dualDrive;;

  for (const key in params.mathrelay) {
    if (Object.prototype.hasOwnProperty.call(params.mathrelay, key)) {
      params.mathrelay[key] = Math.round(params.mathrelay[key] * 100) / 100;
    }
  }
}

// Кодирование рельсовых цепей
function coddingRelay(params) {
  params.coddingRelay = new Object();
  // АЛСН
  const alsnLinesP = 15,
    alsnLinesQ = 12,
    alsnLinesS = 19,
    alsnRouteP = 7,
    alsnRouteQ = 11,
    alsnRouteS = 13;

  params.coddingRelay.alsnLines_TotalP =
    alsnLinesP * params.station.numberOfLines;
  params.coddingRelay.alsnLines_TotalQ =
    alsnLinesQ * params.station.numberOfLines;
  params.coddingRelay.alsnLines_TotalS =
    alsnLinesS * params.station.numberOfLines;

  params.coddingRelay.alsnRoute_TotalP =
    alsnRouteP * params.station.numberApproaches;
  params.coddingRelay.alsnRoute_TotalQ =
    alsnRouteQ * params.station.numberApproaches;
  params.coddingRelay.alsnRoute_TotalS =
    alsnRouteS * params.station.numberApproaches;

  // Мощноость, потребляемая КПТШ и ТШ
  params.coddingRelay.kptsh_TotalS = 110;
  params.coddingRelay.kptsh_TotalCos = 0.8;

  // Кодирующий трансформатор 50 Гц.
  const transformer_P = 22,
    transformer_Q = 76;
  const transformer_S = Math.sqrt(transformer_P ** 2 + transformer_Q ** 2);

  params.coddingRelay.powerFromCoddingTransformerS =
    transformer_S * params.station.numberApproaches;
  params.coddingRelay.powerFromCoddingTransformerP =
    transformer_P * params.station.numberApproaches;
  params.coddingRelay.powerFromCoddingTransformerQ =
    transformer_Q * params.station.numberApproaches;

  // В методе там что-то что-то при кодировании 50 Гц и 25 Гц, лучше посмотреть

  // Дешифраторные ячейки
  const decryptingDevice_P = 16.6,
    decryptingDevice_Q = 16.8;
  const decryptingDevice_S = Math.sqrt(
    decryptingDevice_P ** 2 + decryptingDevice_Q ** 2
  );

  params.coddingRelay.powerFromDecryptingDeviceS =
    decryptingDevice_S * params.station.numberApproaches;
  params.coddingRelay.powerFromDecryptingDeviceP =
    decryptingDevice_P * params.station.numberApproaches;
  params.coddingRelay.powerFromDecryptingDeviceQ =
    decryptingDevice_Q * params.station.numberApproaches;

  for (const key in params.coddingRelay) {
    if (Object.prototype.hasOwnProperty.call(params.coddingRelay, key)) {
      params.coddingRelay[key] =
        Math.round(params.coddingRelay[key] * 100) / 100;
    }
  }
}

// Стрелочные электроприводы
function driveElectric(params) {
  // Контроль цепей и УТС
  params.driveElectric = new Object();
  params.driveElectric.controlCircutsAndUTS_S = 9.3;
  params.driveElectric.controlCircutsAndUTS_P = 7.7;
  params.driveElectric.controlCircutsAndUTS_Q = 5.3;
  params.driveElectric.numberDeviceConrtol =
    params.station.drive - params.station.dualDrive;
  params.driveElectric.controlCircutsAndUTS_TotalS =
    params.driveElectric.controlCircutsAndUTS_S *
    params.driveElectric.numberDeviceConrtol;
  params.driveElectric.controlCircutsAndUTS_TotalP =
    params.driveElectric.controlCircutsAndUTS_P *
    params.driveElectric.numberDeviceConrtol;
  params.driveElectric.controlCircutsAndUTS_TotalQ =
    params.driveElectric.controlCircutsAndUTS_Q *
    params.driveElectric.numberDeviceConrtol;

  // Стрелки двойного управления
  const powerDeviceTransmitter = 10,
    cosDeviceTransmitter = 0.8;
  params.driveElectric.trasmitterDevice_S = params.station.dualWays
    ? powerDeviceTransmitter
    : 0;

  // Рабочие стрелки постоянного (переменного тока) и УТС
  params.driveElectric.powerDriveElectricS = 742;
  params.driveElectric.powerDriveElectricP = 534;
  params.driveElectric.powerDriveElectricQ = 515;
  params.driveElectric.numberSwitchesDrive =
    params.station.drive <= 60
      ? 4
      : params.station.drive > 60 && params.station.drive <= 100
      ? 6
      : 8;
  params.station.stopDevice
    ? params.driveElectric.numberSwitchesDrive++
    : params.driveElectric.numberSwitchesDrive;
  params.driveElectric.powerDriveElectric_TotalS =
    params.driveElectric.powerDriveElectricS *
    params.driveElectric.numberSwitchesDrive;
  params.driveElectric.powerDriveElectric_TotalP =
    params.driveElectric.powerDriveElectricP *
    params.driveElectric.numberSwitchesDrive;
  params.driveElectric.powerDriveElectric_TotalQ =
    params.driveElectric.powerDriveElectricQ *
    params.driveElectric.numberSwitchesDrive;

  // Электрообогрев
  if (
    params.station.climateZone == "Средняя" ||
    params.station.climateZone == "Суровая"
  ) {
    params.driveElectric.powerFromHeatingS = 50;
    params.driveElectric.powerFromHeatingP = 45;
    params.driveElectric.powerFromHeatingQ = 22;
    params.driveElectric.powerFromHeating_TotalS =
      params.driveElectric.powerFromHeatingS * params.station.drive;
    params.driveElectric.powerFromHeating_TotalP =
      params.driveElectric.powerFromHeatingP * params.station.drive;
    params.driveElectric.powerFromHeating_TotalQ =
      params.driveElectric.powerFromHeatingQ * params.station.drive;
  }

  // Пневмоочистка стрелок
  if (params.station.snowDrift) {
    params.driveElectric.pneumoCleaningDriveP = 13;
    params.driveElectric.pneumoCleaningDriveQ = 47;
    params.driveElectric.pneumoCleaningDriveS = Math.sqrt(
      params.driveElectric.pneumoCleaningDriveP ** 2 +
        params.driveElectric.pneumoCleaningDriveQ ** 2
    );
    params.driveElectric.pneumoCleaningDrive_TotalS =
      params.driveElectric.pneumoCleaningDriveS * params.station.drive;
    params.driveElectric.pneumoCleaningDrive_TotalP =
      params.driveElectric.pneumoCleaningDriveP * params.station.drive;
    params.driveElectric.pneumoCleaningDrive_TotalQ =
      params.driveElectric.pneumoCleaningDriveQ * params.station.drive;
  }

  for (const key in params.driveElectric) {
    if (Object.prototype.hasOwnProperty.call(params.driveElectric, key)) {
      params.driveElectric[key] =
        Math.round(params.driveElectric[key] * 100) / 100;
    }
  }
}

// Постовые цепи
function postsCircuts(params) {
  params.postCircuts = new Object();

  // Комплекс технических средств управления и контроля КТС УК системы ЭЦ-МПК.
  params.postCircuts.numberKTS_UK =
    params.station.drive >= 40
      ? 1
      : params.station.drive >= 41 && params.station.drive <= 80
      ? 2
      : 3;
  params.postCircuts.powerComplex = params.postCircuts.numberKTS_UK * 150;

  // Управляющий вычислительный комплекс УВК РА системы ЭЦ-ЕМ
  const powerFromCPU = 118.6;
  const powerFromUSO24min = 62.5;
  const powerFromUSO_in_out = 61.5;
}

// Чтоб таблица отображалась
function createTable(params) {
  // Сигналы
  const tableResultRouteSigns = document.getElementById(
      "tableResultRouteSigns"
    ),
    powerRouteSign = document.getElementsByClassName("powerRouteSign"),
    startEntranceSignal = document.getElementById("startEntranceSignal"),
    resultEntranceSignalP = document.getElementById("resultEntranceSignalP"),
    resultEntranceSignalQ = document.getElementById("resultEntranceSignalQ"),
    resultEntranceSignalS = document.getElementById("resultEntranceSignalS"),
    startDepartManSignal = document.getElementById("startDepart-manSignal"),
    resultDepartManSignalP = document.getElementById("resultDepart-manSignalP"),
    resultDepartManSignalQ = document.getElementById("resultDepart-manSignalQ"),
    resultDepartManSignalS = document.getElementById("resultDepart-manSignalS"),
    startRouteSigns = document.getElementById("startRouteSigns"),
    resultRouteSignsPS = document.getElementsByClassName("resultRouteSignsPS"),
    startRSH = document.getElementsByClassName("startRSH"),
    resultRSHP = document.getElementsByClassName("resultRSHP"),
    resultRSHQ = document.getElementsByClassName("resultRSHQ"),
    resultRSHS = document.getElementsByClassName("resultRSHS"),
    startLocalElement = document.getElementById("startLocalElement"),
    localElement_TotalP = document.getElementById("localElementTotalP"),
    localElement_TotalQ = document.getElementById("localElementTotalQ"),
    localElement_TotalS = document.getElementById("localElementTotalS"),
    startTaga = document.getElementById("startTaga"),
    tagaTotalP = document.getElementById("tagaTotalP"),
    tagaTotalQ = document.getElementById("tagaTotalQ"),
    tagaTotalS = document.getElementById("tagaTotalS"),
    numberLocal = document.getElementById("numberLocal"),
    numberWays = document.getElementById("numberWays"),
    numberApproaches = document.getElementsByClassName("numberApproaches"),
    numberOfLines = document.getElementsByClassName("numberOfLines"),
    rodtagi = document.getElementsByClassName("rodtagi"),
    rotagi2 = document.getElementById("rotagi2"),
    alsnLinesP = document.getElementById("alsnLinesP"),
    alsnLinesQ = document.getElementById("alsnLinesQ"),
    alsnLinesS = document.getElementById("alsnLinesS"),
    alsnRouteP = document.getElementById("alsnRouteP"),
    alsnRouteQ = document.getElementById("alsnRouteQ"),
    alsnRouteS = document.getElementById("alsnRouteS"),
    decryptingDeviceP = document.getElementById("decryptingDeviceP"),
    decryptingDeviceQ = document.getElementById("decryptingDeviceQ"),
    decryptingDeviceS = document.getElementById("decryptingDeviceS"),
    coddingTransformerP = document.getElementById("coddingTransformerP"),
    coddingTransformerQ = document.getElementById("coddingTransformerQ"),
    coddingTransformerS = document.getElementById("coddingTransformerS"),
    numberDeviceConrtol = document.getElementById("numberDeviceConrtol"),
    controlCircutsAndUTSTotalP = document.getElementById(
      "controlCircutsAndUTSTotalP"
    ),
    controlCircutsAndUTSTotalQ = document.getElementById(
      "controlCircutsAndUTSTotalQ"
    ),
    controlCircutsAndUTSTotalS = document.getElementById(
      "controlCircutsAndUTSTotalS"
    ),
    numberSwitchesDrive = document.getElementById("numberSwitchesDrive"),
    powerDriveElectricTotalP = document.getElementById(
      "powerDriveElectricTotalP"
    ),
    powerDriveElectricTotalQ = document.getElementById(
      "powerDriveElectricTotalQ"
    ),
    powerDriveElectricTotalS = document.getElementById(
      "powerDriveElectricTotalS"
    ),
    dualDrive = document.getElementsByClassName("dualDrive"),
    relayCircutAntiphaseP = document.getElementById("relayCircutAntiphaseP"),
    relayCircutAntiphaseQ = document.getElementById("relayCircutAntiphaseQ"),
    relayCircutAntiphaseS = document.getElementById("relayCircutAntiphaseS"),
    relayCircutAntiphaseTotalP = document.getElementById("relayCircutAntiphaseTotalP"),
    relayCircutAntiphaseTotalQ = document.getElementById("relayCircutAntiphaseTotalQ"),
    relayCircutAntiphaseTotalS = document.getElementById("relayCircutAntiphaseTotalS"),
    relePM = document.getElementsByClassName("relePM"),
    numberKTS_UK = document.getElementsByClassName("numberKTS-UK"),
    KTS_UKPS = document.getElementsByClassName("KTS-UKPS"),
    setynPS = document.getElementsByClassName("setynPS"),
    fencesTrainPS = document.getElementsByClassName("fencesTrainPS");

    for (let index = 0; index < fencesTrainPS.length; index++) {
      fencesTrainPS[index].textContent = params.station.numberApproaches * 2,16;
      
    }

    for (let index = 0; index < setynPS.length; index++) {
      setynPS[index].textContent = 1 * 96.0;
      
    }

    for (let index = 0; index < numberKTS_UK.length; index++) {
      numberKTS_UK[index].textContent = params.postCircuts.numberKTS_UK;
    }

    for (let index = 0; index < KTS_UKPS.length; index++) {
      KTS_UKPS[index].textContent = params.postCircuts.numberKTS_UK * 150;
      
    }

    for (let index = 0; index < relePM.length; index++) {
      relePM[index].textContent = params.station.numberOfLines * 7.7;
      
    }

  tableResultRouteSigns.textContent =
    params.station.routeSigns == "Светодиодные"
      ? "Светодиодные маршрутные указатели"
      : "Ламповые маршрутные указатели";
  for (let index = 0; index < powerRouteSign.length; index++) {
    powerRouteSign[index].textContent = params.mathload.lightDiodTotalPS
      ? params.mathload.lightDiodPS
      : params.mathload.lampsPS;
  }

  startEntranceSignal.textContent = params.station.entranceSignal;
  resultEntranceSignalP.textContent = params.mathload.entranceSignalTotalP;
  resultEntranceSignalQ.textContent = params.mathload.entranceSignalTotalQ;
  resultEntranceSignalS.textContent = params.mathload.entranceSignalTotalS;

  startDepartManSignal.textContent = params.mathload.departManSignal;
  resultDepartManSignalP.textContent = params.mathload.departManSignalTotalP;
  resultDepartManSignalQ.textContent = params.mathload.departManSignalTotalQ;
  resultDepartManSignalS.textContent = params.mathload.departManSignalTotalS;

  startRouteSigns.textContent = params.station.routeSignsNumbers;
  for (let index = 0; index < resultRouteSignsPS.length; index++) {
    resultRouteSignsPS[index].textContent = params.mathload.lightDiodTotalPS
      ? params.mathload.lightDiodTotalPS
      : params.mathload.lampsTotalPS;
  }

  for (let index = 0; index < startRSH.length; index++) {
    startRSH[index].innerHTML = `${params.station.numberApproaches}<br />${params.station.numberApproaches}<br />1`;
  }
  for (let index = 0; index < resultRSHP.length; index++) {
    resultRSHP[index].innerHTML = `${params.mathload.rta1TotalP}<br />${params.mathload.haetingTotalP}<br />${params.mathload.lightTotalP}`;
  }
  for (let index = 0; index < resultRSHQ.length; index++) {
    resultRSHQ[index].innerHTML = `${params.mathload.rta1TotalQ}<br />${params.mathload.haetingTotalQ}<br />-`;
  }
  for (let index = 0; index < resultRSHS.length; index++) {
    resultRSHS[index].innerHTML = `${params.mathload.rta1TotalS}<br />${params.mathload.haetingTotalS}<br />${params.mathload.lightTotalS}`;
  }


  startLocalElement.textContent = params.mathrelay.localElementNumber;
  localElement_TotalP.textContent = params.mathrelay.localElement_TotalP;
  localElement_TotalQ.textContent = params.mathrelay.localElement_TotalQ;
  localElement_TotalS.textContent = params.mathrelay.localElement_TotalS;

  startTaga.textContent = params.mathrelay.tagaNumber;
  tagaTotalP.textContent = params.mathrelay.taga_TotalP;
  tagaTotalQ.textContent = params.mathrelay.taga_TotalQ;
  tagaTotalS.textContent = params.mathrelay.taga_TotalS;

  numberLocal.textContent = params.mathrelay.numberLocal;
  numberWays.textContent = params.mathrelay.numberWays;

  for (let index = 0; index < numberApproaches.length; index++) {
    numberApproaches[index].textContent = params.station.numberApproaches;
  }

  for (let index = 0; index < numberOfLines.length; index++) {
    numberOfLines[index].textContent = params.station.numberOfLines;
  }

  for (let index = 0; index < rodtagi.length; index++) {
    rodtagi[index].innerHTML =
      params.rodTagi.name == "Автономная"
        ? "АТ"
        : params.rodTagi.name == "Электрическая переменного тока"
        ? "ЭТ &sim;I"
        : "ЭТ -I";
  }

  rotagi2.innerHTML =
    params.rodTagi.name == "Автономная"
      ? "автономной тяге"
      : params.rodTagi.name == "Электрическая переменного тока"
      ? "электрической тяге &sim;I"
      : "электрической тяге -I";

  alsnLinesP.textContent = params.coddingRelay.alsnLines_TotalP;
  alsnLinesQ.textContent = params.coddingRelay.alsnLines_TotalQ;
  alsnLinesS.textContent = params.coddingRelay.alsnLines_TotalS;
  alsnRouteP.textContent = params.coddingRelay.alsnRoute_TotalP;
  alsnRouteQ.textContent = params.coddingRelay.alsnRoute_TotalQ;
  alsnRouteS.textContent = params.coddingRelay.alsnRoute_TotalS;

  decryptingDeviceP.textContent =
    params.coddingRelay.powerFromDecryptingDeviceP;
  decryptingDeviceQ.textContent =
    params.coddingRelay.powerFromDecryptingDeviceQ;
  decryptingDeviceS.textContent =
    params.coddingRelay.powerFromDecryptingDeviceS;

  coddingTransformerP.textContent =
    params.coddingRelay.powerFromCoddingTransformerP;
  coddingTransformerQ.textContent =
    params.coddingRelay.powerFromCoddingTransformerQ;
  coddingTransformerS.textContent =
    params.coddingRelay.powerFromCoddingTransformerS;

  numberDeviceConrtol.textContent = params.driveElectric.numberDeviceConrtol;
  controlCircutsAndUTSTotalP.textContent =
    params.driveElectric.controlCircutsAndUTS_TotalP;
  controlCircutsAndUTSTotalQ.textContent =
    params.driveElectric.controlCircutsAndUTS_TotalQ;
  controlCircutsAndUTSTotalS.textContent =
    params.driveElectric.controlCircutsAndUTS_TotalS;

  // добавление строк в таблицу
  let countRows = 2;
  params.station.climateZone == "Средняя" ||
  params.station.climateZone == "Суровая"
    ? countRows++
    : countRows;
  params.station.snowDrift ? countRows++ : countRows;
  params.station.dualWays ? countRows++ : countRows;

  const trRows = document.getElementById("trRows");
  let trRowsClass = document.getElementsByClassName("trRows");
  console.log(trRowsClass.length);

  if (trRowsClass.length > 0) {
    for (let index = 0; index < trRowsClass.length; index++) {
      trRowsClass[index].innerHTML = ``;
    }
  }
  let trText = ``;
  if (
    params.station.climateZone == "Средняя" ||
    params.station.climateZone == "Суровая"
  ) {
    trText = `
          <tr class="trRows"><td><span>4.${countRows}</span></td>
          <td class="left"><span>Электрообогрев</span></td>
          <td><span>стр.</span></td>
          <td><span>${params.driveElectric.powerFromHeatingP}</span></td>
          <td><span>${params.driveElectric.powerFromHeatingQ}</span></td>
          <td><span>${params.driveElectric.powerFromHeatingS}</span></td>
          <td><span>${params.station.drive}</span></td>
          <td><span>${params.driveElectric.powerFromHeating_TotalP}</span></td>
          <td><span>${params.driveElectric.powerFromHeating_TotalQ}</span></td>
          <td><span>${params.driveElectric.powerFromHeating_TotalS}</span></td>
          <!-- Пустые -->
          <td></td>
          <td></td></tr>
          `;
    countRows--;
    trRows.insertAdjacentHTML("afterend", trText);
  }
  if (params.station.snowDrift) {
    trText = `
          <tr class="trRows"><td><span>4.${countRows}</span></td>
          <td class="left"><span>Пневмоочистка</span></td>
          <td><span>стр.</span></td>
          <td><span>${params.driveElectric.pneumoCleaningDriveP}</span></td>
          <td><span>${params.driveElectric.pneumoCleaningDriveQ}</span></td>
          <td><span>${params.driveElectric.pneumoCleaningDriveS}</span></td>
          <td><span>${params.station.drive}</span></td>
          <td><span>${params.driveElectric.pneumoCleaningDrive_TotalP}</span></td>
          <td><span>${params.driveElectric.pneumoCleaningDrive_TotalQ}</span></td>
          <td><span>${params.driveElectric.pneumoCleaningDrive_TotalS}</span></td>
          <!-- Пустые -->
          <td></td>
          <td></td></tr>
          `;
    countRows--;
    trRows.insertAdjacentHTML("afterend", trText);
  }

  if (params.station.dualWays) {
    params.station.dualWaysP = 8;
    params.station.dualWaysQ = 6;
    params.station.dualWaysS = 10;
    params.station.dualWaysNumber = 1;
    trText = `
        <tr class="trRows"><td><span>4.${countRows}</span></td>
        <td class="left"><span>Стрелки двойного управления</span></td>
        <td><span>стр.</span></td>
        <td><span>${params.station.dualWaysP}</span></td>
        <td><span>${params.station.dualWaysQ}</span></td>
        <td><span>${params.station.dualWaysS}</span></td>
        <td><span>1</span></td>
        <td><span>${
          params.station.dualWaysP * params.station.dualWaysNumber
        }</span></td>
        <td><span>${
          params.station.dualWaysQ * params.station.dualWaysNumber
        }</span></td>
        <td><span>${
          params.station.dualWaysS * params.station.dualWaysNumber
        }</span></td>
        <!-- Пустые -->
        <td></td>
        <td></td></tr>`;
    countRows--;
    trRows.insertAdjacentHTML("afterend", trText);
  }

  numberSwitchesDrive.textContent = params.driveElectric.numberSwitchesDrive;
  powerDriveElectricTotalP.textContent =
    params.driveElectric.powerDriveElectric_TotalP;
  powerDriveElectricTotalQ.textContent =
    params.driveElectric.powerDriveElectric_TotalQ;
  powerDriveElectricTotalS.textContent =
    params.driveElectric.powerDriveElectric_TotalS;

  for (let index = 0; index < dualDrive.length; index++) {
    dualDrive[index].textContent = params.station.dualDrive;
  }

  relayCircutAntiphaseP.textContent = params.mathrelay.relayCircutAntiphaseP;
  relayCircutAntiphaseQ.textContent = params.mathrelay.relayCircutAntiphaseQ;
  relayCircutAntiphaseS.textContent = params.mathrelay.relayCircutAntiphaseS;
  relayCircutAntiphaseTotalP.textContent = params.mathrelay.relayCircutAntiphase_TotalP;
  relayCircutAntiphaseTotalQ.textContent = params.mathrelay.relayCircutAntiphase_TotalQ
  relayCircutAntiphaseTotalS.textContent = params.mathrelay.relayCircutAntiphase_TotalS
}

buttonResult.addEventListener("click", () => {
  empty = inputEmpty(); // Переменная которая указывает на то, пустые ли поля (false = все поля заполненны, true = есть пустые поля)
  errors = [];
  // console.log(`Поля пустые? ${empty}`); Проверка что возвращает

  if (empty == false && deviceCos.value <= 1) {
    build(body);
    mathLoad(body);
    mathRelay(body);
    coddingRelay(body);
    driveElectric(body);
    postsCircuts(body);
    createTable(body);
    tableResult.classList.add("visible");
    tableResult.classList.remove("hidden");
    console.log(body);

    // Включение таблицы
  } else if (deviceCos.value > 1) {
    body = {};
    countError();
    // console.log(errors);
    deviceCos.classList.add("errorInput");
  } else {
    body = {};
    countError();
    // console.log(errors);
  }
  if (errors.length == 0) {
    errorWindow.classList.remove("visible");
    errorWindow.classList.add("hidden");
  } else {
    errorWindow.classList.add("visible");
    errorWindow.classList.remove("hidden");
  }

  // console.log(body);
});

const closeSign = document.getElementById("close-sign");
closeSign.addEventListener("click", () => {
  errorWindow.classList.remove("visible");
  errorWindow.classList.add("hidden");
});

// Do something
