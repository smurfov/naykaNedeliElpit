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

build(body);
console.log(body);

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

// Сделали сегодня 

buttonResult.addEventListener("click", () => {
  inputEmpty();
  console.log("Work");
});

// Do something
