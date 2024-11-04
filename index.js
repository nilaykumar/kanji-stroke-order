const inputText = document.getElementById("input-text");
const outputDiv = document.getElementById('output');

inputText.value = '私は昨日川に行きました。';

function isKanji(v) {
    return (v >= 0x4E00 && v <= 0x9FC3) || (v >= 0x3400 && v <= 0x4DBF) || (v >= 0xF900 && v <= 0xFAD9) || (v >= 0x2E80 && v <= 0x2EFF) || (v >= 0x20000 && v <= 0x2A6DF);
}

function createSVGObjectIfKanji(c) {
    codePoint = c.codePointAt(0);
    boolKanji = isKanji(codePoint);
    codePointString = codePoint.toString(16).padStart(5, '0');
    if(!boolKanji)
        return c;
    kanjiObject = document.createElement('object');
    kanjiObject.data = `kanji/${codePointString}.svg`;
    kanjiObject.type = 'image/svg+xml';
    if(kanjiObject === undefined)
        return null;
    return kanjiObject;
}

function updateOutput(s) {
    charArr = s.split('');
    kanjiArr = charArr.map(createSVGObjectIfKanji);
    outputDiv.replaceChildren(...kanjiArr);
}

function inputHandler(event) {
    updateOutput(event.target.value);
}

updateOutput(inputText.value)
inputText.addEventListener('input', inputHandler);
