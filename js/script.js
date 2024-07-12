let savedGames = [];

function validateDuplicateNumbers() {
    const fixedNumbers = [];
    for (let i = 1; i <= 3; i++) {
        const fixedNumberInput = document.getElementById(`fixed-number-${i}`);
        if (fixedNumberInput && fixedNumberInput.value !== '') {
            if (fixedNumbers.includes(parseInt(fixedNumberInput.value))) {
                alert(`Número duplicado detectado: ${fixedNumberInput.value}. Por favor, insira um número diferente.`);
                fixedNumberInput.value = '';
                return false;
            }
            fixedNumbers.push(parseInt(fixedNumberInput.value));
        }
    }
    const fixedTrevoInput = document.getElementById('fixed-trevo');
    if (fixedTrevoInput && fixedTrevoInput.value !== '') {
        if (fixedTrevoInput.value <= 1 || fixedTrevoInput.value >= 6) {
            alert(`Trevo inválido: ${fixedTrevoInput.value}. Por favor, insira um número entre 1 e 6.`);
            fixedTrevoInput.value = '';
            return false;
        }
    }
    return true;
}

function generateNumbers() {
    if (!validateDuplicateNumbers()) {
        return;
    }

    const fixed1 = parseInt(document.getElementById('fixed-number-1').value);
    const fixed2 = parseInt(document.getElementById('fixed-number-2').value);
    const fixed3 = parseInt(document.getElementById('fixed-number-3').value);
    const fixedTrevo = parseInt(document.getElementById('fixed-trevo').value);

    if (isNaN(fixed1) || isNaN(fixed2) || isNaN(fixed3) || isNaN(fixedTrevo)) {
        alert("Por favor, insira números fixos e trevo válidos.");
        return;
    }

    const fixedNumbers = [fixed1, fixed2, fixed3];
    const allNumbers = Array.from({ length: 60 }, (_, i) => i + 1);
    const availableNumbers = allNumbers.filter(num => !fixedNumbers.includes(num));
    const randomNumbers = [];

    while (randomNumbers.length < 3) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const number = availableNumbers.splice(randomIndex, 1)[0];
        randomNumbers.push(number);
    }

    const allTrevos = [1, 2, 3, 4];
    const availableTrevos = allTrevos.filter(trevo => trevo !== fixedTrevo);
    const randomTrevo = availableTrevos[Math.floor(Math.random() * availableTrevos.length)];

    const generatedNumbers = [...fixedNumbers, ...randomNumbers].sort((a, b) => a - b);
    document.getElementById('generated-numbers').innerText = `Números Gerados: ${generatedNumbers.join(', ')} + Trevos: ${fixedTrevo}, ${randomTrevo}`;
}

function saveGame() {
    const generatedText = document.getElementById('generated-numbers').innerText;
    if (!generatedText) {
        alert("Nenhum jogo gerado para salvar.");
        return;
    }

    const generatedNumbers = generatedText.replace('Números Gerados: ', '');
    savedGames.push(generatedNumbers);

    const savedGamesDiv = document.getElementById('saved-games');
    savedGamesDiv.innerHTML = savedGames.map(game => `<div>${game}</div>`).join('');
}

function exportToExcel() {
    if (savedGames.length === 0) {
        alert("Nenhum jogo salvo para exportar.");
        return;
    }

    const worksheet = XLSX.utils.aoa_to_sheet(savedGames.map(game => game.split(', ')));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jogos Salvos");
    XLSX.writeFile(workbook, "jogos_milionaria.xlsx");
}
