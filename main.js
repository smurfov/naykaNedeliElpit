const deviceCos = document.getElementById("device-cos");

let body = new Object();

const buttonResult = document.getElementById("result");

const tableResult = document.getElementById("tableResult");

// Создание объекта который хранит данные которые ввел пользователь на самом сайте
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
    a.station.pereezdnayaSignalitation = false;
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
  a.station.garantePowerDevice.cos = Number(deviceCos.value);
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
function mathLoad(element) {
  // Signals data
  element.mathload = new Object();
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
  element.mathload.lampsPS = 25;
  element.mathload.lightDiodPS = 15;

  // math enterece
  element.mathload.entranceSignalTotalP =
    entranceSignalP * element.station.entranceSignal;
  element.mathload.entranceSignalTotalQ =
    entranceSignalQ * element.station.entranceSignal;
  element.mathload.entranceSignalTotalS =
    entranceSignalS * element.station.entranceSignal;

  // math depart_manSignal
  element.mathload.departManSignal =
    element.station.departureSignal + element.station.shuntingDwarf;
  element.mathload.departManSignalTotalP =
    depart_manSignalP * element.mathload.departManSignal;
  element.mathload.departManSignalTotalQ =
    depart_manSignalQ * element.mathload.departManSignal;
  element.mathload.departManSignalTotalS =
    depart_manSignalS * element.mathload.departManSignal;

  // math signals
  if (element.station.routeSigns == "Светодиодные") {
    element.mathload.lightDiodTotalPS =
      element.mathload.lightDiodPS * element.station.routeSignsNumbers;
    // console.log(lightDiodPS, element.station.routeSignsNumbers, element.mathLoad.lightDiodTotalPS);
  } else {
    element.mathload.lampsTotalPS =
      element.mathload.lampsPS * element.station.routeSignsNumbers;
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
  element.mathload.lightTotalP = lightsPS;
  element.mathload.lightTotalS = lightsPS;
  console.log("mathload");

  for (const key in element.mathload) {
    if (Object.prototype.hasOwnProperty.call(element.mathload, key)) {
      element.mathload[key] = Math.round(element.mathload[key] * 100) / 100;
      // console.log(obj);
    }
  }
}

// Расчет рельсовой цепи с преобразователями частоты 25 Гц.
function mathRelay(element) {
  // Relay data
  element.mathrelay = new Object();
  const localElement_P = 2.44,
    localElement_Q = 7.5,
    localElement_S = 7.9;

  element.mathrelay.localElement_TotalP =
    localElement_P *
    (element.station.numberOfLines + 2 * element.station.drive);
  element.mathrelay.localElement_TotalQ =
    localElement_Q *
    (element.station.numberOfLines + 2 * element.station.drive);
  element.mathrelay.localElement_TotalS =
    localElement_S *
    (element.station.numberOfLines + 2 * element.station.drive);

  if (element.rodTagi.name == "Электрическая переменного тока") {
    // Значения если род тяги "Электрическая переменного тока"
    const elTagaPerem_P = 31.5,
      elTagaPerem_Q = 14.8,
      elTagaPerem_S = 34.8;

    element.mathrelay.taga_TotalP =
      elTagaPerem_P * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.taga_TotalQ =
      elTagaPerem_Q * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.taga_TotalS =
      elTagaPerem_S * (element.station.numberOfLines + element.station.drive);
  } else if (element.rodTagi.name == "Электрическая постоянного тока") {
    // Значения если род тяги "Электрическая постоянного тока"
    const elTagaPost_P = 17.2,
      elTagaPost_Q = 12.2,
      elTagaPost_S = 21.1;

    element.mathrelay.taga_TotalP =
      elTagaPost_P * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.taga_TotalQ =
      elTagaPost_Q * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.taga_TotalS =
      elTagaPost_S * (element.station.numberOfLines + element.station.drive);
  } else if (element.rodTagi.name == "Автономная") {
    // Значения если род тяги "Автономная"
    const automatic_P = 16.8,
      automatic_Q = 7.85,
      automatic_S = 18.54;

    element.mathrelay.taga_TotalP =
      automatic_P * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.taga_TotalQ =
      automatic_Q * (element.station.numberOfLines + element.station.drive);
    element.mathrelay.taga_TotalS =
      automatic_S * (element.station.numberOfLines + element.station.drive);
  }

  for (const key in element.mathrelay) {
    if (Object.prototype.hasOwnProperty.call(element.mathrelay, key)) {
      element.mathrelay[key] = Math.round(element.mathrelay[key] * 100) / 10;
    }
  }
}

// Кодирование рельсовых цепей
function coddingRelay(params) {
  params.coddingRelay = new Object();
  // Мощноость, потребляемая КПТШ и ТШ
  params.coddingRelay.kptsh_TotalS = 110;
  params.coddingRelay.kptsh_TotalCos = 0.8;

  // Кодирующий трансформатор 50 Гц.
  const transformer_P = 22,
    transformer_Q = 76;
  const transformer_S = Math.round(
    Math.sqrt(transformer_P ** 2 + transformer_Q ** 2)
  );

  params.coddingRelay.powerFromCoddingTransformer =
    transformer_S * params.station.numberApproaches;
  // В методе там что-то что-то при кодировании 50 Гц и 25 Гц, лучше посмотреть

  // Дешифраторные ячейки
  const decryptingDevice_P = 16.6,
    decryptingDevice_Q = 16.8;
  const decryptingDevice_S = Math.round(
    Math.sqrt(decryptingDevice_P ** 2 + decryptingDevice_Q ** 2)
  );

  params.coddingRelay.powerFromDecryptingDevice =
    decryptingDevice_S * params.station.numberApproaches;
}

// Стрелочные электроприводы
function driveElectric(params) {
  // Контроль цепей и УТС
  params.driveElectric = new Object();
  const controlCircutsAndUTS = 9.3;
  params.driveElectric.powerFromDeviceControl =
    controlCircutsAndUTS * (params.station.drive - params.station.dualDrive);

  // Стрелки двойного управления
  const powerDeviceTransmitter = 10,
    cosDeviceTransmitter = 0.8;
  params.driveElectric.trasmitterDevice_S = params.station.dualWays
    ? powerDeviceTransmitter
    : 0;

  // Рабочие стрелки постоянного (переменного тока) и УТС
  const powerDriveElectric = 742;
  let numberSwitchesDrive =
    params.station.drive <= 60
      ? 4
      : params.station.drive > 60 && params.station.drive <= 100
      ? 6
      : 8;
  params.station.stopDevice ? numberSwitchesDrive++ : numberSwitchesDrive;
  params.driveElectric.drive = powerDriveElectric * numberSwitchesDrive;

  // Электрообогрев
  if (
    params.station.climateZone == "Средняя" ||
    params.station.climateZone == "Суровая"
  ) {
    const powerFromHeating = 50;
    params.driveElectric.powerFromHeating =
      powerFromHeating * params.station.drive;
  }

  // Пневмоочистка стрелок
  if (params.station.snowDrift) {
    params.driveElectric.pneumoCleaningDrive = Math.sqrt(13 ** 2 + 47 ** 2);
  }

  for (const key in params.driveElectric) {
    if (Object.prototype.hasOwnProperty.call(params.driveElectric, key)) {
      const element = Math.round(params.driveElectric[key] * 100) / 10;
    }
  }
}

// Постовые цепи
function postsCircuts(params) {
  params.postCircuts = new Object();

  // Комплекс технических средств управления и контроля КТС УК системы ЭЦ-МПК.
  const numberKTS_UK =
    params.station.drive >= 40
      ? 1
      : params.station.drive >= 41 && params.station.drive <= 80
      ? 2
      : 3;
  params.postCircuts.powerComplex = numberKTS_UK * 150;

  // Управляющий вычислительный комплекс УВК РА системы ЭЦ-ЕМ
  const powerFromCPU = 118.6;
  const powerFromUSO24min = 62.5;
  const powerFromUSO_in_out = 61.5;
}

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
    startRSH = document.getElementById("startRSH"),
    resultRSHP = document.getElementById("resultRSHP"),
    resultRSHQ = document.getElementById("resultRSHQ"),
    resultRSHS = document.getElementById("resultRSHS");

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

  startRouteSigns.textContent = params.mathload.routeSignsNumbers;
  for (let index = 0; index < resultRouteSignsPS.length; index++) {
    resultRouteSignsPS[index].textContent = params.mathload.lightDiodTotalPS
      ? params.mathload.lightDiodTotalPS
      : params.mathload.lampsTotalPS;
  }

  startRSH.innerHTML = `${params.station.numberApproaches}<br />${params.station.numberApproaches}<br />1`;
  resultRSHP.innerHTML = `${params.mathload.rta1TotalP}<br />${params.mathload.haetingTotalP}<br />${params.mathload.lightTotalP}`;
  resultRSHQ.innerHTML = `${params.mathload.rta1TotalQ}<br />${params.mathload.haetingTotalQ}<br />-`;
  resultRSHS.innerHTML = `${params.mathload.rta1TotalS}<br />${params.mathload.haetingTotalS}<br />${params.mathload.lightTotalS}`;
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
