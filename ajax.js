function createData() { 
    const name = document.getElementById("nameInput").value;
    const height = document.getElementById("heightInput").value;
    const weight = document.getElementById("weightInput").value;
    const code = document.getElementById("codeInput").value;

    if (!name || !height || !weight || !code) {
        document.getElementById("responseMessage").innerText = "Minden mezőt ki kell tölteni!";
        return;
    }

    if (height < 1 || height > 300 || weight < 1 || weight > 300) {
        document.getElementById("responseMessage").innerText = "A magasság és súly 1 és 300 között kell legyen!";
        return;
    }

    const data = {
        op: "create",
        name: name,
        height: height,
        weight: weight,
        code: code
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let params = `op=${data.op}&name=${encodeURIComponent(data.name)}&height=${encodeURIComponent(data.height)}&weight=${encodeURIComponent(data.weight)}&code=${encodeURIComponent(data.code)}`;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);

                if (response.rowCount === 1) {
                    document.getElementById("responseMessage").innerText = "Adat sikeresen létrehozva!";
                    fetchData();
                } else {
                    document.getElementById("responseMessage").innerText = `Hiba történt az adatok hozzáadásakor: ${response.message}`;
                }
            } catch (e) {
                document.getElementById("responseMessage").innerText = "Hiba történt a válasz feldolgozásakor!";
            }
        }
    };

    xhr.send(params);
}

function updateData() {
    const id = document.getElementById("updateIdInput").value;
    const name = document.getElementById("updateNameInput").value;
    const height = document.getElementById("updateHeightInput").value;
    const weight = document.getElementById("updateWeightInput").value;
    const code = document.getElementById("updateCodeInput").value;

    if (!id || !name || !height || !weight || !code) {
        document.getElementById("responseMessage").innerText = "Minden mezőt ki kell tölteni!";
        return;
    }

    const data = {
        op: "update",
        id: id,
        name: name,
        height: height,
        weight: weight,
        code: code
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let params = `op=${data.op}&id=${encodeURIComponent(data.id)}&name=${encodeURIComponent(data.name)}&height=${encodeURIComponent(data.height)}&weight=${encodeURIComponent(data.weight)}&code=${encodeURIComponent(data.code)}`;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);

                if (response.rowCount === 1) {
                    document.getElementById("responseMessage").innerText = "Adat sikeresen frissítve!";
                    fetchData();
                } else {
                    document.getElementById("responseMessage").innerText = "Hiba történt az adatok frissítésekor.";
                }
            } catch (e) {
                document.getElementById("responseMessage").innerText = "Hiba történt a válasz feldolgozásakor!";
            }
        }
    };

    xhr.send(params);
}

function deleteData() {
    const id = document.getElementById("deleteIdInput").value;
    const code = document.getElementById("deleteCodeInput").value;

    if (!id || !code) {
        document.getElementById("responseMessage").innerText = "Minden mezőt ki kell tölteni!";
        return;
    }

    const data = {
        op: "delete",
        id: id,
        code: code
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let params = `op=${data.op}&id=${encodeURIComponent(data.id)}&code=${encodeURIComponent(data.code)}`;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);

                if (response.rowCount === 1) {
                    document.getElementById("responseMessage").innerText = "Adat sikeresen törölve!";
                    fetchData();
                } else {
                    document.getElementById("responseMessage").innerText = "Hiba történt az adatok törlésében.";
                }
            } catch (e) {
                document.getElementById("responseMessage").innerText = "Hiba történt a válasz feldolgozásakor!";
            }
        }
    };

    xhr.send(params);
}

function getDataForId() {
    const id = document.getElementById("updateIdInput").value;

    if (!id) {
        document.getElementById("responseMessage").innerText = "ID-t kell megadni!";
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://gamf.nhely.hu/ajax2/?op=read&code=OUVN70efg456`, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                const dataList = response.list;

                const dataItem = dataList.find(item => item.id === id);
                if (dataItem) {
                    document.getElementById("updateNameInput").value = dataItem.name;
                    document.getElementById("updateHeightInput").value = dataItem.height;
                    document.getElementById("updateWeightInput").value = dataItem.weight;
                    document.getElementById("updateCodeInput").value = dataItem.code;
                } else {
                    document.getElementById("responseMessage").innerText = "Az adott ID nem található!";
                }
            } catch (e) {
                document.getElementById("responseMessage").innerText = "Hiba történt a válasz feldolgozásakor!";
            }
        }
    };

    xhr.send();
}

function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://gamf.nhely.hu/ajax2/?op=read&code=OUVN70efg456", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                const dataList = response.list;
                const tableBody = document.querySelector("#ajaxTable tbody");
                tableBody.innerHTML = "";

                dataList.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.height}</td>
                        <td>${item.weight}</td>
                        <td>${item.code}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } catch (e) {
                document.getElementById("responseMessage").innerText = "Hiba történt a válasz feldolgozásakor!";
            }
        }
    };

    xhr.send();
}

window.onload = fetchData;
