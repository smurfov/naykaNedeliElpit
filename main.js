const deviceCos = document.getElementById("device-cos");

let body = {};

const buttonResult = document.getElementById("result");

const tableResult = document.getElementById("tableResult");

const n = 2; // макс. кол-во знаков после

const batteryData = [
  {
    type: "Delta DTM 1233 L",
    voltage: 12,
    nominalCapacity: 33,
    dimensions: { D: 195, W: 130, H: 155 },
    weight: 10.1,
    price: 5618,
  },
  {
    type: "Delta DTM 1240 L",
    voltage: 12,
    nominalCapacity: 40,
    dimensions: { D: 198, W: 166, H: 170 },
    weight: 14,
    price: 8107,
  },
  {
    type: "Delta DTM 1255 L",
    voltage: 12,
    nominalCapacity: 55,
    dimensions: { D: 239, W: 132, H: 205 },
    weight: 16.2,
    price: 9057,
  },
  {
    type: "Delta DTM 1265 L",
    voltage: 12,
    nominalCapacity: 65,
    dimensions: { D: 350, W: 167, H: 179 },
    weight: 22.4,
    price: 12022,
  },
  {
    type: "Delta DTM 1275 L",
    voltage: 12,
    nominalCapacity: 75,
    dimensions: { D: 258, W: 166, H: 206 },
    weight: 22.4,
    price: 12809,
  },
  {
    type: "Delta DTM 1290 L",
    voltage: 12,
    nominalCapacity: 90,
    dimensions: { D: 306, W: 169, H: 211 },
    weight: 27,
    price: 15271,
  },
  {
    type: "Delta DTM 12100 L",
    voltage: 12,
    nominalCapacity: 100,
    dimensions: { D: 330, W: 171, H: 215 },
    weight: 27,
    price: 15673,
  },
  {
    type: "Delta DTM 12150 L",
    voltage: 12,
    nominalCapacity: 150,
    dimensions: { D: 482, W: 170, H: 240 },
    weight: 45,
    price: 23931,
  },
  {
    type: "Delta DTM 12200 L",
    voltage: 12,
    nominalCapacity: 200,
    dimensions: { D: 522, W: 238, H: 218 },
    weight: 59,
    price: 30510,
  },
  {
    type: "Delta DTM 12230 L",
    voltage: 12,
    nominalCapacity: 230,
    dimensions: { D: 520, W: 269, H: 203 },
    weight: 72.6,
    price: 34714,
  },
  {
    type: "Delta DTM 12250 L",
    voltage: 12,
    nominalCapacity: 250,
    dimensions: { D: 520, W: 269, H: 221 },
    weight: 74,
    price: 37991,
  },
];

const ROUND_NUMBER = 10 ** n; // 10^n

// Округление больших значений свойств body
function round(params) {
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (typeof params[key] === "number") {
        params[key] = Math.round(params[key] * ROUND_NUMBER) / ROUND_NUMBER;
      } else if (typeof params[key] === "object" && params[key] !== null) {
        round(params[key]);
      }
    }
  }
}

// Округление определнного значения
function roundValue(params) {
  return Math.round(params * ROUND_NUMBER) / ROUND_NUMBER;
}

// Создание объекта который хранит данные которые ввел пользователь на самом сайте
function build(params) {
  // Выбор рода тяги
  params.rodTagi = {};
  params.rodTagi.name = document.getElementById("rodTagi-list").value;

  // Внешнее электроснабжение
  params.vneshneeEletrosnabzhenie = {};
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
  params.station = {};
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
  params.station.garantePowerDevice = {};
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
  params.garantAndNotgarantLoad = {};
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
      // alert("Вы не заполнили все поля");
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

// Проверка на отрицательные числа
function negativeNumber() {
  let inputCount = 0; // Подсчет пустых полей
  let input = document.getElementsByTagName("input");
  for (let i = 0; i < input.length; i++) {
    if (Number(input[i].value) < 0) {
      // alert("Вы не заполнили все поля");
      input[i].classList.add("errorInput");
      inputCount++;
      // break;
    } else {
      input[i].classList.remove("errorInput");
    }
  }
  // console.log(inputCount); // Проверка значения переменной inputCount

  if (inputCount == 0) {
    return false; // нет негативных чисел
  } else {
    return true; // есть негативные числа
  }
}

// Вывод ошибок в окно
const errorWindow = document.getElementById("error-window");
function countError(params) {
  // let empty = inputEmpty(); // Переменная которая указывает на то, пустые ли поля (false = все поля заполненны, true = есть пустые поля)
  let negative = negativeNumber();
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
  if (inputEmpty()) {
    params.push("Есть пустые поля");
  }
  if (negative) {
    params.push("В исходных данных есть отрицательные числа.");
  }
  const deviceCosValue = deviceCos.value;
  // console.log(deviceCosValue);

  if (deviceCosValue == "") {
    deviceCos.classList.add("errorInput");
  } else if (deviceCosValue <= 1 && deviceCosValue >= 0) {
    deviceCos.classList.remove("errorInput");
  } else if (deviceCosValue > 1) {
    deviceCos.classList.add("errorInput");
    params.push("Значение cos φ не может быть больше 1.");
  } else if (deviceCosValue < 0) {
    deviceCos.classList.add("errorInput");
    params.push("Значение cos φ не может быть меньше 0.");
  }
  for (let i = 0; i < params.length; i++) {
    ol.classList.add("error-window__list");
    const li = document.createElement("li");
    li.textContent = params[i];
    li.classList.add("error-window__list__point");
    ol.appendChild(li);
  }
}

// Расчет мощности нагрузок бесперебойного питания
function mathLoad(params) {
  // Signals data
  params.mathload = {};
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

  round(params.mathload);
}

// Расчет рельсовой цепи с преобразователями частоты 25 Гц.
function mathRelay(params) {
  // Relay data
  params.mathrelay = {};

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
  params.mathrelay.numberLocal = Math.ceil(
    params.mathrelay.localElement_TotalS / powerLocalConvertor
  );
  params.mathrelay.numberWays = Math.ceil(
    params.mathrelay.taga_TotalS / powerWaysConvertor
  );

  round(params.mathrelay);
}

// Кодирование рельсовых цепей
function coddingRelay(params) {
  params.coddingRelay = {};
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

  // for (const key in params.coddingRelay) {
  //   if (Object.prototype.hasOwnProperty.call(params.coddingRelay, key)) {
  //     params.coddingRelay[key] =
  //       Math.round(params.coddingRelay[key] * 100) / 100;
  //   }
  // }

  round(params.coddingRelay);
}

// Стрелочные электроприводы
function driveElectric(params) {
  // Контроль цепей и УТС
  params.driveElectric = {};
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

  round(params.driveElectric);
}

// Постовые цепи
function postsCircuts(params) {
  params.postCircuts = {};

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

  round(params.postCircuts);
}

// Расчет трансформатора
function mathTransformator(params) {
  // Итоговые значение мощностей
  const totalPowerS = document.getElementsByClassName("totalPowerS"),
    totalPowerSField = document.getElementById("totalPowerS"),
    totalPowerQ = document.getElementsByClassName("totalPowerQ"),
    totalPowerQField = document.getElementById("totalPowerQ"),
    totalPowerP = document.getElementsByClassName("totalPowerP"),
    totalPowerPField = document.getElementById("totalPowerP"),
    // Потери на трансформатор 10%
    lostPowerS = document.getElementById("lostPowerS"),
    lostPowerQ = document.getElementById("lostPowerQ"),
    lostPowerP = document.getElementById("lostPowerP");

  // console.log(totalPowerS);

  params.mathTransformator = {};

  let totalPowerSValue = 0;
  for (let index = 0; index < totalPowerS.length; index++) {
    totalPowerSValue += Number(totalPowerS[index].textContent);
    // console.log(totalPowerS[index].textContent);
  }
  let totalPowerQValue = 0;
  for (let index = 0; index < totalPowerQ.length; index++) {
    if (totalPowerQ[index].textContent != "-") {
      totalPowerQValue += Number(totalPowerQ[index].textContent);
    }
    // console.log(totalPowerS[index].textContent);
  }
  let totalPowerPValue = 0;
  for (let index = 0; index < totalPowerP.length; index++) {
    if (totalPowerP[index].textContent != "-") {
      totalPowerPValue += Number(totalPowerP[index].textContent);
    }
    // console.log(totalPowerS[index].textContent);
  }

  totalPowerSValue +=
    params.mathload.rta1TotalS +
    params.mathload.haetingTotalS +
    params.mathload.lightTotalS;
  totalPowerQValue +=
    params.mathload.rta1TotalQ + params.mathload.haetingTotalQ;
  totalPowerPValue +=
    params.mathload.rta1TotalP +
    params.mathload.haetingTotalP +
    params.mathload.lightTotalP;

  // console.log(totalPowerSValue);

  params.mathTransformator.totalPowerS = roundValue(totalPowerSValue);
  totalPowerSField.textContent = params.mathTransformator.totalPowerS;
  params.mathTransformator.totalPowerQ = roundValue(totalPowerQValue);
  totalPowerQField.textContent = params.mathTransformator.totalPowerQ;
  params.mathTransformator.totalPowerP = roundValue(totalPowerPValue);
  totalPowerPField.textContent = params.mathTransformator.totalPowerP;

  params.mathTransformator.maxPower = 1500;
  params.mathTransformator.extraPhasePower = 1200;

  params.mathTransformator.lostPowerS =
    params.mathTransformator.totalPowerS * 0.1;
  params.mathTransformator.powerSHBN =
    params.mathTransformator.lostPowerS + params.mathTransformator.totalPowerS;
  params.mathTransformator.number1Phase = Math.ceil(
    params.mathTransformator.totalPowerS / 1200
  );
  params.mathTransformator.lostPowerQ =
    params.mathTransformator.totalPowerQ * 0.1;
  params.mathTransformator.lostPowerP =
    params.mathTransformator.totalPowerP * 0.1;
  // console.log(params.mathTransformator.number1Phase);

  params.mathTransformator.number3Phase = Math.round(
    params.mathTransformator.number1Phase / 3
  );
  params.mathTransformator.remainsPower =
    params.mathTransformator.totalPowerS - 10800;

  round(params.mathTransformator);
  lostPowerS.textContent = params.mathTransformator.lostPowerS;
  lostPowerQ.textContent = params.mathTransformator.lostPowerQ;
  lostPowerP.textContent = params.mathTransformator.lostPowerP;
}

// Расчет общей мощности без стрелок
function powerWithoutDrive(params) {
  const powerWithoutDriveP =
      document.getElementsByClassName("powerWithoutDriveP"),
    powerWithoutDriveQ = document.getElementsByClassName("powerWithoutDriveQ"),
    powerWithoutDriveS = document.getElementsByClassName("powerWithoutDriveS"),
    fieldPowerWithoutDriveP = document.getElementById(
      "fieldPowerWithoutDriveP"
    ),
    fieldPowerWithoutDriveQ = document.getElementById(
      "fieldPowerWithoutDriveQ"
    ),
    fieldPowerWithoutDriveS = document.getElementById(
      "fieldPowerWithoutDriveS"
    );

  params.powerWithoutDrive = {};

  let totalPowerWithoutDriveP = 0;
  for (let index = 0; index < powerWithoutDriveP.length; index++) {
    if (powerWithoutDriveP[index].textContent != "-") {
      totalPowerWithoutDriveP += Number(powerWithoutDriveP[index].textContent);
    }
  }
  params.powerWithoutDrive.P =
    totalPowerWithoutDriveP +
    params.mathTransformator.totalPowerP +
    params.mathTransformator.lostPowerP;
  let totalPowerWithoutDriveQ = 0;
  for (let index = 0; index < powerWithoutDriveQ.length; index++) {
    if (powerWithoutDriveQ[index].textContent != "-") {
      totalPowerWithoutDriveQ += Number(powerWithoutDriveQ[index].textContent);
    }
  }
  params.powerWithoutDrive.Q =
    totalPowerWithoutDriveQ +
    params.mathTransformator.totalPowerQ +
    params.mathTransformator.lostPowerQ;
  let totalPowerWithoutDriveS = 0;
  for (let index = 0; index < powerWithoutDriveS.length; index++) {
    if (powerWithoutDriveS[index].textContent != "-") {
      totalPowerWithoutDriveS += Number(powerWithoutDriveS[index].textContent);
    }
  }
  params.powerWithoutDrive.S =
    totalPowerWithoutDriveS +
    params.mathTransformator.totalPowerS +
    params.mathTransformator.lostPowerS;

  round(params.powerWithoutDrive);
  fieldPowerWithoutDriveP.textContent = params.powerWithoutDrive.P;
  fieldPowerWithoutDriveQ.textContent = params.powerWithoutDrive.Q;
  fieldPowerWithoutDriveS.textContent = params.powerWithoutDrive.S;
}

function sumActivePower(params) {
  const sumActivePower = document.getElementsByClassName("sumActivePower");

  params.sumActivePower = {};

  params.sumActivePower.P = params.powerWithoutDrive.P * 1.2;
  params.sumActivePower.S = params.sumActivePower.P;

  round(params.sumActivePower);

  for (let index = 0; index < sumActivePower.length; index++) {
    sumActivePower[index].textContent = params.sumActivePower.P;
  }
}

// Расчет и выбор элементов УБП
function mathAndChooseElementsUPS(params) {
  const accumName = document.getElementById("accum_name"),
    accumNominal = document.getElementById("accum_nominal"),
    powerUPS = document.getElementById("powerUPS"),
    powerUPSnominal = document.getElementById("powerUPSnominal");

  params.mathAndChooseElementsUPS = {};

  // Массив возможных значений
  const values = [1.1, 1.2, 1.3];

  // Случайный выбор значения из массива
  const n = values[Math.floor(Math.random() * values.length)];
  // console.log(n);
  params.mathAndChooseElementsUPS.n = n;

  // Мощность УБП
  params.mathAndChooseElementsUPS.powerUPS =
    1.2 * 3 * params.powerWithoutDrive.S * n;

  let pound = params.mathAndChooseElementsUPS.powerUPS;

  for (let index = 0; index < 4; index++) {
    pound /= 10;
  }

  if (pound < 1 && pound > 0) pound *= 10;

  pound = Math.ceil(pound);

  params.mathAndChooseElementsUPS.powerUPSnominal = pound * 10 * 1000;

  // Расчет емкости аккумуляторной батареи
  const time_charging = 2,
    koefficient_charging = 0.61,
    temp_koefficient = 0.008,
    temp_electrolit = 15,
    temp_nominal_capacity = 20,
    kpd_invertora = 0.9,
    koefficient_deep_charging = 0.9,
    power_accum = 422.4;

  params.mathAndChooseElementsUPS.capacity =
    (params.sumActivePower.P * time_charging) /
    (power_accum *
      koefficient_charging *
      (1 + temp_koefficient * (temp_electrolit - temp_nominal_capacity)) *
      kpd_invertora *
      koefficient_deep_charging);

  // Выбор аккумуляторной батареи
  if (
    params.mathAndChooseElementsUPS.capacity === undefined ||
    isNaN(params.mathAndChooseElementsUPS.capacity)
  ) {
    console.error("Capacity is undefined or NaN");
  } else {
    // Перебираем массив batteryData
    for (let index = 0; index < batteryData.length; index++) {
      if (index == 0) {
        if (
          params.mathAndChooseElementsUPS.capacity <
          batteryData[index].nominalCapacity
        ) {
          params.mathAndChooseElementsUPS.accm = batteryData[index];
          break;
        }
      } else if (index == batteryData.length - 1) {
        if (
          params.mathAndChooseElementsUPS.capacity >=
          batteryData[index].nominalCapacity
        ) {
          params.mathAndChooseElementsUPS.accm = batteryData[index];
          break;
        }
      } else {
        if (
          params.mathAndChooseElementsUPS.capacity >=
            batteryData[index].nominalCapacity &&
          params.mathAndChooseElementsUPS.capacity <
            batteryData[index + 1].nominalCapacity
        ) {
          params.mathAndChooseElementsUPS.accm = batteryData[index];
          break;
        }
      }
    }
  }

  round(params.mathAndChooseElementsUPS);

  // Выводим результаты
  accumName.textContent = params.mathAndChooseElementsUPS.accm.type;
  accumNominal.textContent =
    params.mathAndChooseElementsUPS.accm.nominalCapacity;

  powerUPS.textContent = params.mathAndChooseElementsUPS.powerUPS;
  powerUPSnominal.textContent = params.mathAndChooseElementsUPS.powerUPSnominal;
}

// Расчет шины гарантированного питания
function mathGarantPower(params) {
  const garantPower = document.getElementsByClassName("garantPower"),
    garantPowerTotal = document.getElementById("garantPowerTotal"),
    powerInsulatingTransformator = document.getElementById(
      "powerInsulatingTransformator"
    );

  params.mathGarantPower = {};
  let totalGarantPower = 0;
  for (let index = 0; index < garantPower.length; index++) {
    if (garantPower[index].textContent != "-") {
      totalGarantPower += Number(garantPower[index].value);
    }
  }

  params.mathGarantPower.totalGarantPower = totalGarantPower * 1000;

  params.mathGarantPower.powerInsulatingTransformator =
    params.mathAndChooseElementsUPS.powerUPSnominal * 1.25;

  round(params.mathGarantPower);

  garantPowerTotal.textContent = params.mathGarantPower.totalGarantPower;
  powerInsulatingTransformator.textContent =
    params.mathGarantPower.powerInsulatingTransformator;
}

// Расчёт мощности нагрузок негарантированных потребителей
function mathNonGarantPower(params) {
  const nonGarantPower = document.getElementsByClassName("nonGarantPower"),
    nonGarantPowerTotal = document.getElementById("nonGarantPowerTotal");
  params.mathNonGarantPower = {};
  let totalNonGarantPower = 0;
  for (let index = 0; index < nonGarantPower.length; index++) {
    if (nonGarantPower[index].textContent != "-") {
      totalNonGarantPower += Number(nonGarantPower[index].value);
    }
  }

  params.mathNonGarantPower.power = totalNonGarantPower * 1000;

  roundValue(params.mathNonGarantPower);

  nonGarantPowerTotal.textContent = params.mathNonGarantPower.power;
}

// Расчёт мощности РАЭС
function mathPowerDGA(params) {
  const powerDGA = document.getElementById("powerDGA");

  params.mathPowerDGA = {};

  params.mathPowerDGA.power =
    ((params.sumActivePower.S * 1.25) / 0.915 / 0.97 / 0.85) * 1.8 +
    params.mathGarantPower.totalGarantPower;

  const length = String(Math.abs(Math.floor(params.mathPowerDGA.power))).length;

  // Если длина числа меньше 4, то округляем до ближайших 10^(длина-1)
  if (length < 4) {
    params.mathPowerDGA.powerNominal =
      Math.round(Math.floor(params.mathPowerDGA.power) / 10 ** (length - 1)) *
      10 ** (length - 1);
  } else {
    // Для чисел длиной 4 и более округляем до ближайших 10^(длина-3)
    const multiplier = 10 ** (length - 3);
    params.mathPowerDGA.powerNominal =
      Math.round(Math.floor(params.mathPowerDGA.power) / multiplier) *
      multiplier;
  }
  params.mathPowerDGA.degreeOfLoading =
    params.mathPowerDGA.power / params.mathPowerDGA.powerNominal;

  round(params.mathPowerDGA);

  powerDGA.textContent = params.mathPowerDGA.power;
}

// Чтоб таблица отображалась
function createTable(params) {
  // Сигналы
  const tableResultRouteSigns = document.getElementById(
      "tableResultRouteSigns"
    ),
    // Постоянные которые постоянно вставляются из исходных данных
    powerRouteSign = document.getElementsByClassName("powerRouteSign"),
    dualDrive = document.getElementsByClassName("dualDrive"),
    numberApproaches = document.getElementsByClassName("numberApproaches"),
    numberOfLines = document.getElementsByClassName("numberOfLines"),
    // Светофоры входные
    startEntranceSignal = document.getElementById("startEntranceSignal"),
    resultEntranceSignalP = document.getElementById("resultEntranceSignalP"),
    resultEntranceSignalQ = document.getElementById("resultEntranceSignalQ"),
    resultEntranceSignalS = document.getElementById("resultEntranceSignalS"),
    // Светофоры выходные и маневровые
    startDepartManSignal = document.getElementById("startDepart-manSignal"),
    resultDepartManSignalP = document.getElementById("resultDepart-manSignalP"),
    resultDepartManSignalQ = document.getElementById("resultDepart-manSignalQ"),
    resultDepartManSignalS = document.getElementById("resultDepart-manSignalS"),
    // Индикаторы
    startRouteSigns = document.getElementById("startRouteSigns"),
    resultRouteSignsPS = document.getElementsByClassName("resultRouteSignsPS"),
    // РШ входных светофоров и РШ охраняемого переезда
    startRSH = document.getElementsByClassName("startRSH"),
    resultRSHP = document.getElementsByClassName("resultRSHP"),
    resultRSHQ = document.getElementsByClassName("resultRSHQ"),
    resultRSHS = document.getElementsByClassName("resultRSHS"),
    // Местные элементы РЦ 25 Гц (релейный конец)
    startLocalElement = document.getElementById("startLocalElement"),
    localElement_TotalP = document.getElementById("localElementTotalP"),
    localElement_TotalQ = document.getElementById("localElementTotalQ"),
    localElement_TotalS = document.getElementById("localElementTotalS"),
    // Путевые элементы РЦ 25 Гц (питающий конец)
    startTaga = document.getElementById("startTaga"),
    tagaTotalP = document.getElementById("tagaTotalP"),
    tagaTotalQ = document.getElementById("tagaTotalQ"),
    tagaTotalS = document.getElementById("tagaTotalS"),
    rotagi2 = document.getElementById("rotagi2"),
    // ПЧ50/25-300 (при одиночном включении)
    numberAlone = document.getElementById("numberAlone"),
    numberLocal = document.getElementById("numberLocal"),
    relayCircutAloneTotalP = document.getElementById("relayCircutAloneTotalP"),
    relayCircutAloneTotalQ = document.getElementById("relayCircutAloneTotalQ"),
    relayCircutAloneTotalS = document.getElementById("relayCircutAloneTotalS"),
    // ПЧ50/25-300 (при попарно противофазном включении)
    numberPairs = document.getElementById("numberPairs"),
    numberWays = document.getElementById("numberWays"),
    relayCircutAntiphaseP = document.getElementById("relayCircutAntiphaseP"),
    relayCircutAntiphaseQ = document.getElementById("relayCircutAntiphaseQ"),
    relayCircutAntiphaseS = document.getElementById("relayCircutAntiphaseS"),
    relayCircutAntiphaseTotalP = document.getElementById(
      "relayCircutAntiphaseTotalP"
    ),
    relayCircutAntiphaseTotalQ = document.getElementById(
      "relayCircutAntiphaseTotalQ"
    ),
    relayCircutAntiphaseTotalS = document.getElementById(
      "relayCircutAntiphaseTotalS"
    ),
    // АЛСН (пути). при L=1000м
    rodtagi = document.getElementsByClassName("rodtagi"),
    alsnLinesP = document.getElementById("alsnLinesP"),
    alsnLinesQ = document.getElementById("alsnLinesQ"),
    alsnLinesS = document.getElementById("alsnLinesS"),
    // АЛСН (маршруты). при L=300м
    alsnRouteP = document.getElementById("alsnRouteP"),
    alsnRouteQ = document.getElementById("alsnRouteQ"),
    alsnRouteS = document.getElementById("alsnRouteS"),
    // Дешифр. ячейки
    decryptingDeviceP = document.getElementById("decryptingDeviceP"),
    decryptingDeviceQ = document.getElementById("decryptingDeviceQ"),
    decryptingDeviceS = document.getElementById("decryptingDeviceS"),
    // Кодирующие трансформаторы
    coddingTransformerP = document.getElementById("coddingTransformerP"),
    coddingTransformerQ = document.getElementById("coddingTransformerQ"),
    coddingTransformerS = document.getElementById("coddingTransformerS"),
    // Рабочие цепи стрелок и УТС
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
    // Контрольные цепи стрелок и УТС
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
    // Реле П-М (0.34 А х 28 В)
    relePM = document.getElementsByClassName("relePM"),
    // КТС УК
    numberKTS_UK = document.getElementsByClassName("numberKTS-UK"),
    KTS_UKPS = document.getElementsByClassName("KTS-UKPS"),
    // ДЦ «СЕТУНЬ»
    setynPS = document.getElementsByClassName("setynPS"),
    // Ограждение составов
    fencesTrainPS = document.getElementsByClassName("fencesTrainPS");

  for (let index = 0; index < fencesTrainPS.length; index++) {
    fencesTrainPS[index].textContent = roundValue(
      params.station.numberApproaches * 2.16
    );
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
    relePM[index].textContent = roundValue(params.station.numberOfLines * 7.7);
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
    startRSH[
      index
    ].innerHTML = `${params.station.numberApproaches}<br />${params.station.numberApproaches}<br />1`;
  }
  for (let index = 0; index < resultRSHP.length; index++) {
    resultRSHP[
      index
    ].innerHTML = `${params.mathload.rta1TotalP}<br />${params.mathload.haetingTotalP}<br />${params.mathload.lightTotalP}`;
  }
  for (let index = 0; index < resultRSHQ.length; index++) {
    resultRSHQ[
      index
    ].innerHTML = `${params.mathload.rta1TotalQ}<br />${params.mathload.haetingTotalQ}<br />-`;
  }
  for (let index = 0; index < resultRSHS.length; index++) {
    resultRSHS[
      index
    ].innerHTML = `${params.mathload.rta1TotalS}<br />${params.mathload.haetingTotalS}<br />${params.mathload.lightTotalS}`;
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
  // console.log(trRowsClass.length);

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
          <td><span class="totalPowerP">${params.driveElectric.powerFromHeating_TotalP}</span></td>
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
          <td><span class="totalPowerP">${params.driveElectric.pneumoCleaningDrive_TotalP}</span></td>
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
        <td><span class="totalPowerP">${
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

  let numberPairsValue =
    params.mathrelay.numberLocal + params.mathrelay.numberWays;
  // console.log(numberPairsValue);
  if (numberPairsValue % 2 == 0) {
    params.mathrelay.numberPairs = numberPairsValue / 2;
    params.mathrelay.numberAlone = 0;
  } else {
    params.mathrelay.numberPairs = numberPairsValue / 2 - 0.5;
    params.mathrelay.numberAlone = 1;
  }

  numberAlone.textContent = params.mathrelay.numberAlone;
  relayCircutAloneTotalP.textContent = params.mathrelay.numberAlone * 430;
  relayCircutAloneTotalQ.textContent = params.mathrelay.numberAlone * 770;
  relayCircutAloneTotalS.textContent = params.mathrelay.numberAlone * 880;

  numberPairs.textContent = params.mathrelay.numberPairs;
  params.mathrelay.relayCircutAntiphase_TotalP =
    params.mathrelay.relayCircutAntiphaseP * params.mathrelay.numberPairs;
  params.mathrelay.relayCircutAntiphase_TotalQ =
    params.mathrelay.relayCircutAntiphaseQ * params.mathrelay.numberPairs;
  params.mathrelay.relayCircutAntiphase_TotalS =
    params.mathrelay.relayCircutAntiphaseS * params.mathrelay.numberPairs;

  relayCircutAntiphaseTotalP.textContent =
    params.mathrelay.relayCircutAntiphase_TotalP;
  relayCircutAntiphaseTotalQ.textContent =
    params.mathrelay.relayCircutAntiphase_TotalQ;
  relayCircutAntiphaseTotalS.textContent =
    params.mathrelay.relayCircutAntiphase_TotalS;
}

// Функция для обработки body
function processBody(data) {
  build(data);
  mathLoad(data);
  mathRelay(data);
  coddingRelay(data);
  driveElectric(data);
  postsCircuts(data);
  createTable(data);
  mathTransformator(data);
  powerWithoutDrive(data);
  sumActivePower(data);
  mathAndChooseElementsUPS(data);
  mathGarantPower(data);
  mathNonGarantPower(data);
  mathPowerDGA(data);
}

// Функция чтоб делать элементы видимыми/невидимыми
function toggleVisibility(element, isVisible) {
  element.classList.toggle("visible", isVisible);
  element.classList.toggle("hidden", !isVisible);
}

buttonResult.addEventListener("click", () => {
  let errors = [];
  countError(errors);

  // Обновляем состояние окна ошибок
  toggleVisibility(errorWindow, errors.length > 0);

  if (errors.length === 0) {
    processBody(body);
    tableResult.classList.add("visible");
    tableResult.classList.remove("hidden");
    console.log(body);
  } else {
    body = {};
  }
});

// Функция для переключения видимости элемента

const closeSign = document.getElementById("close-sign");
closeSign.addEventListener("click", () => {
  errorWindow.classList.remove("visible");
  errorWindow.classList.add("hidden");
});

// Do something
