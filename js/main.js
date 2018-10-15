const url = `https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture`;

let promise = fetch(url)
  .then(response => {return (response.json())})
  .then(result => formatter(result))
  .catch(error => alert(error))

let formattedData;

function formatter(response) {
  formattedData = response.results;
  render(formattedData)
}

function render(formattedData) {

  const selected = {
    classPicture: document.querySelectorAll('.picture'),
    classUserName: document.querySelectorAll('.userName')
  }

  for (let i = 0; i < formattedData.length; i++) {
    let iconChange = formattedData[i].picture.medium;
    selected.classPicture[i].setAttribute('src', `${iconChange}`);
  }

  for (let i = 0; i < formattedData.length; i++) {

    let obj = {
      userTitle: formattedData[i].name.title,
      firstName: formattedData[i].name.first,
      lastName: formattedData[i].name.last
    }
    selected.classUserName[i].textContent = `${obj.userTitle}  ${obj.firstName}  ${obj.lastName}`
  }
}

function renderSort() {
  formattedData.sort((a, b) => {
    if (a.name.last > b.name.last) {
      return 1;
    }
    if (a.name.last < b.name.last) {
      return -1;
    }
    return 0;
  });
  render(formattedData)
}

function renderSortBack() {
  formattedData.sort((a, b) => {
    if (a.name.last < b.name.last) {
      return 1;
    }
    if (a.name.last > b.name.last) {
      return -1;
    }
    return 0;
  });
  render(formattedData)
}

function makeListener() {
  document.getElementById('sort').addEventListener("click", renderSort)
  document.getElementById('sortBack').addEventListener("click", renderSortBack)
  document.getElementById('wrap').addEventListener("click", closePopUp)

  let elements = document.querySelectorAll(".user");
  for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = () => {

      let namePerson = (elements[i].querySelector('.userName').textContent)
      let arrNamePerson = namePerson.split('  ')
      let popUpData = formattedData.find(finder);

      function finder(element) {
        if (element.name.title == arrNamePerson[0] && element.name.first == arrNamePerson[1] && element.name.last == arrNamePerson[2]) {
          return element
        }
      }

      renderPopUp(popUpData)
    };

  }
}

function closePopUp() {
  document.getElementById('popUp').setAttribute('style', `display: none`)
  document.getElementById('wrap').setAttribute('style', `display: none`)
}

function renderPopUp(popUpData) {

  const obj = {
    idPopUp: document.getElementById('popUp'),
    idWrap: document.getElementById('wrap'),
    idUserNameFull: document.getElementById('userNameFull'),
    idAvatar: document.getElementById('avatar'),
    idStreet: document.getElementById('street'),
    idCity: document.getElementById('city'),
    idState: document.getElementById('state'),
    idEmail: document.getElementById('email'),
    idPhone: document.getElementById('phone')
  }

  obj.idPopUp.setAttribute('style', `display: block`)
  obj.idWrap.setAttribute('style', `display: block`)
  obj.idUserNameFull.textContent = `${popUpData.name.title} ${ popUpData.name.first} ${ popUpData.name.last }`
  obj.idAvatar.setAttribute('src', popUpData.picture.large)
  obj.idStreet.textContent = `street: ${popUpData.location.street}`
  obj.idCity.textContent = `city: ${popUpData.location.city}`
  obj.idState.textContent = `state: ${popUpData.location.state}`
  obj.idEmail.textContent = `email: ${popUpData.email}`
  obj.idPhone.textContent = `phone: ${popUpData.phone}`
}

makeListener()