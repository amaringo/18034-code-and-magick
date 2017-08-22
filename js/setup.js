'use strict';

(function () {
  var WIZARD_DETAILS = {
    names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document
      .querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  function getWizards(wizardAmount) {
    var getRandomName = createRandomArrayItemGetter(WIZARD_DETAILS['names']);
    var getRandomSurname = createRandomArrayItemGetter(WIZARD_DETAILS['surnames']);
    var getRandomCoatColor = createRandomArrayItemGetter(WIZARD_DETAILS['coatColors']);
    var getRandomEyesColors = createRandomArrayItemGetter(WIZARD_DETAILS['eyesColors']);

    var wizards = [];

    for (var i = 0; i < wizardAmount; i++) {
      wizards.push({
        name: getRandomName() + ' ' + getRandomSurname(),
        coatColor: getRandomCoatColor(),
        eyesColor: getRandomEyesColors()
      });
    }

    return wizards;
  }

  function createRandomArrayItemGetter(array) {
    var randomSource = array.slice();

    return function () {
      var randomNumber;
      if (randomSource.length === 1) {
        randomNumber = randomSource[0];
        randomSource = array.slice();
      } else {
        var randomId = Math.floor(Math.random() * randomSource.length);
        randomNumber = randomSource[randomId];
        randomSource.splice(randomId, 1);
      }

      return randomNumber;
    };
  }

  function getWizardElement(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  function renderWizards(wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(getWizardElement(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  }

  var wizards = getWizards(4);
  renderWizards(wizards);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
