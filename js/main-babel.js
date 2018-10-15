'use strict';

function getData(url) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function () {

    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {

      alert('\u041E\u0448\u0438\u0431\u043A\u0430 ' + xhr.status);
    } else {
      var response = JSON.parse(xhr.responseText);
      formatter(response);
    }
  };
}

var url = 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture';
var formattedData = void 0;

getData(url);

function formatter(response) {
  formattedData = response.results;
  render(formattedData);
}

function render(formattedData) {

  var selected = {
    classPicture: document.querySelectorAll('.picture'),
    classUserName: document.querySelectorAll('.userName')
  };

  for (var i = 0; i < formattedData.length; i++) {
    var iconChange = formattedData[i].picture.medium;
    selected.classPicture[i].setAttribute('src', '' + iconChange);
  }

  for (var _i = 0; _i < formattedData.length; _i++) {

    var obj = {
      userTitle: formattedData[_i].name.title,
      firstName: formattedData[_i].name.first,
      lastName: formattedData[_i].name.last
    };
    selected.classUserName[_i].textContent = obj.userTitle + '  ' + obj.firstName + '  ' + obj.lastName;
  }
}

function renderSort() {
  formattedData.sort(function (a, b) {
    if (a.name.last > b.name.last) {
      return 1;
    }
    if (a.name.last < b.name.last) {
      return -1;
    }
    return 0;
  });
  render(formattedData);
}

function renderSortBack() {
  formattedData.sort(function (a, b) {
    if (a.name.last < b.name.last) {
      return 1;
    }
    if (a.name.last > b.name.last) {
      return -1;
    }
    return 0;
  });
  render(formattedData);
}

function makeListener() {
  document.getElementById('sort').addEventListener("click", renderSort);
  document.getElementById('sortBack').addEventListener("click", renderSortBack);
  document.getElementById('wrap').addEventListener("click", closePopUp);

  var elements = document.querySelectorAll(".user");

  var _loop = function _loop(i) {
    elements[i].onclick = function () {

      var namePerson = elements[i].querySelector('.userName').textContent;
      var arrNamePerson = namePerson.split('  ');
      var popUpData = formattedData.find(finder);

      function finder(element) {
        if (element.name.title == arrNamePerson[0] && element.name.first == arrNamePerson[1] && element.name.last == arrNamePerson[2]) {
          return element;
        }
      }

      renderPopUp(popUpData);
    };
  };

  for (var i = 0; i < elements.length; i++) {
    _loop(i);
  }
}

function closePopUp() {
  document.getElementById('popUp').setAttribute('style', 'display: none');
  document.getElementById('wrap').setAttribute('style', 'display: none');
}

function renderPopUp(popUpData) {

  var obj = {
    idPopUp: document.getElementById('popUp'),
    idWrap: document.getElementById('wrap'),
    idUserNameFull: document.getElementById('userNameFull'),
    idAvatar: document.getElementById('avatar'),
    idStreet: document.getElementById('street'),
    idCity: document.getElementById('city'),
    idState: document.getElementById('state'),
    idEmail: document.getElementById('email'),
    idPhone: document.getElementById('phone')
  };

  obj.idPopUp.setAttribute('style', 'display: block');
  obj.idWrap.setAttribute('style', 'display: block');
  obj.idUserNameFull.textContent = popUpData.name.title + ' ' + popUpData.name.first + ' ' + popUpData.name.last;
  obj.idAvatar.setAttribute('src', popUpData.picture.large);
  obj.idStreet.textContent = 'street: ' + popUpData.location.street;
  obj.idCity.textContent = 'city: ' + popUpData.location.city;
  obj.idState.textContent = 'state: ' + popUpData.location.state;
  obj.idEmail.textContent = 'email: ' + popUpData.email;
  obj.idPhone.textContent = 'phone: ' + popUpData.phone;
}

makeListener();