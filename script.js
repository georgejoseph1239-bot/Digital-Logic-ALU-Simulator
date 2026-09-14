// ========================================
// DIGITAL LOGIC & 4-BIT ALU SIMULATOR
// ========================================


// ---------- LOGIC GATES ----------

function AND(a, b) {
    return a & b;
}

function OR(a, b) {
    return a | b;
}

function NOT(a) {
    return a ? 0 : 1;
}

function NAND(a, b) {
    return NOT(AND(a, b));
}

function NOR(a, b) {
    return NOT(OR(a, b));
}

function XOR(a, b) {
    return a ^ b;
}

function XNOR(a, b) {
    return NOT(XOR(a, b));
}


// ---------- LOGIC GATE SIMULATOR ----------

function openLogicGates() {

    const moduleArea = document.getElementById("simulator");

    moduleArea.innerHTML = `
        <div class="section-heading">
            <p class="tag">INTERACTIVE SIMULATOR</p>
            <h2>Logic Gate Simulator</h2>
            <p>Change the inputs and observe the output.</p>
        </div>

        <div class="gate-panel">

            <div class="input-group">
                <label>Input A</label>
                <button id="inputA" onclick="toggleInput('A')">0</button>
            </div>

            <div class="input-group">
                <label>Input B</label>
                <button id="inputB" onclick="toggleInput('B')">0</button>
            </div>

            <div class="gate-selector">

                <label>Select Gate</label>

                <select id="gateSelect" onchange="calculateGate()">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="NOT">NOT</option>
                    <option value="NAND">NAND</option>
                    <option value="NOR">NOR</option>
                    <option value="XOR">XOR</option>
                    <option value="XNOR">XNOR</option>
                </select>

            </div>

            <div class="output-box">

                <div class="output-label">
                    OUTPUT
                </div>

                <div id="gateOutput">
                    0
                </div>

            </div>

        </div>
    `;

    calculateGate();
}


// ---------- INPUT CONTROL ----------

let inputA = 0;
let inputB = 0;


function toggleInput(input) {

    if (input === "A") {
        inputA = inputA === 0 ? 1 : 0;

        document.getElementById("inputA").textContent = inputA;
    }

    else if (input === "B") {
        inputB = inputB === 0 ? 1 : 0;

        document.getElementById("inputB").textContent = inputB;
    }

    calculateGate();
}


// ---------- CALCULATE OUTPUT ----------

function calculateGate() {

    const gate = document.getElementById("gateSelect");

    if (!gate) {
        return;
    }

    const selectedGate = gate.value;

    let result = 0;

    switch (selectedGate) {

        case "AND":
            result = AND(inputA, inputB);
            break;

        case "OR":
            result = OR(inputA, inputB);
            break;

        case "NOT":
            result = NOT(inputA);
            break;

        case "NAND":
            result = NAND(inputA, inputB);
            break;

        case "NOR":
            result = NOR(inputA, inputB);
            break;

        case "XOR":
            result = XOR(inputA, inputB);
            break;

        case "XNOR":
            result = XNOR(inputA, inputB);
            break;
    }

    document.getElementById("gateOutput").textContent = result;
}


// ---------- CONNECT LOGIC GATES BUTTON ----------

document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".module-card button");

    if (buttons.length >= 2) {

        // Logic Gates
        buttons[0].onclick = openLogicGates;

        // Truth Tables
        buttons[1].onclick = openTruthTables;
        buttons[2].onclick = openFlipFlops;
        buttons[3].onclick = openClockSimulator;
        buttons[4].onclick = openCounter;
        buttons[5].onclick = openALU;

    }

});
// ========================================
// TRUTH TABLE GENERATOR
// ========================================

function openTruthTables() {

    const moduleArea = document.getElementById("simulator");

    moduleArea.innerHTML = `
        <div class="section-heading">
            <p class="tag">INTERACTIVE SIMULATOR</p>
            <h2>Truth Table Generator</h2>
            <p>Select a logic gate to generate its truth table.</p>
        </div>

        <div class="gate-panel">

            <div class="gate-selector">

                <label>Select Gate</label>

                <select id="truthGate" onchange="generateTruthTable()">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="NOT">NOT</option>
                    <option value="NAND">NAND</option>
                    <option value="NOR">NOR</option>
                    <option value="XOR">XOR</option>
                    <option value="XNOR">XNOR</option>
                </select>

            </div>

            <div id="truthTableContainer"></div>

        </div>
    `;

    generateTruthTable();
}


// Generate table

function generateTruthTable() {

    const gate = document.getElementById("truthGate").value;

    let html = "";

    if (gate === "NOT") {

        html = `
            <table class="truth-table">
                <tr>
                    <th>A</th>
                    <th>OUTPUT</th>
                </tr>

                <tr>
                    <td>0</td>
                    <td>${NOT(0)}</td>
                </tr>

                <tr>
                    <td>1</td>
                    <td>${NOT(1)}</td>
                </tr>
            </table>
        `;

    } else {

        html = `
            <table class="truth-table">

                <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>OUTPUT</th>
                </tr>

                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td>${calculateTruthOutput(gate, 0, 0)}</td>
                </tr>

                <tr>
                    <td>0</td>
                    <td>1</td>
                    <td>${calculateTruthOutput(gate, 0, 1)}</td>
                </tr>

                <tr>
                    <td>1</td>
                    <td>0</td>
                    <td>${calculateTruthOutput(gate, 1, 0)}</td>
                </tr>

                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>${calculateTruthOutput(gate, 1, 1)}</td>
                </tr>

            </table>
        `;
    }

    document.getElementById("truthTableContainer").innerHTML = html;
}


// Calculate truth-table output

function calculateTruthOutput(gate, a, b) {

    switch (gate) {

        case "AND":
            return AND(a, b);

        case "OR":
            return OR(a, b);

        case "NAND":
            return NAND(a, b);

        case "NOR":
            return NOR(a, b);

        case "XOR":
            return XOR(a, b);

        case "XNOR":
            return XNOR(a, b);

        default:
            return 0;
    }
}
// ========================================
// FLIP-FLOP SIMULATOR
// ========================================

let flipFlopQ = 0;

function openFlipFlops() {

    const moduleArea = document.getElementById("simulator");

    moduleArea.innerHTML = `
        <div class="section-heading">
            <p class="tag">SEQUENTIAL LOGIC</p>
            <h2>Flip-Flop Simulator</h2>
            <p>Explore SR, D, JK and T flip-flop behaviour.</p>
        </div>

        <div class="gate-panel">

            <div class="gate-selector">
                <label>Select Flip-Flop</label>

                <select id="flipFlopSelect" onchange="updateFlipFlop()">
                    <option value="SR">SR Flip-Flop</option>
                    <option value="D">D Flip-Flop</option>
                    <option value="JK">JK Flip-Flop</option>
                    <option value="T">T Flip-Flop</option>
                </select>
            </div>

            <div id="flipFlopInputs"></div>

            <div class="output-box">

                <div class="output-label">CURRENT STATE</div>

                <div id="flipFlopOutput">Q = 0</div>

            </div>

            <button class="reset-button" onclick="resetFlipFlop()">
                Reset Q
            </button>

        </div>
    `;

    updateFlipFlop();
}


// ---------- UPDATE INPUTS ----------

function updateFlipFlop() {

    flipFlopQ = 0;

    const type = document.getElementById("flipFlopSelect").value;
    const inputArea = document.getElementById("flipFlopInputs");

    if (type === "SR") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>Set (S)</label>
                <button id="inputS" onclick="toggleFlipInput('S')">0</button>
            </div>

            <div class="input-group">
                <label>Reset (R)</label>
                <button id="inputR" onclick="toggleFlipInput('R')">0</button>
            </div>

            <button class="simulate-button" onclick="simulateFlipFlop()">
                Apply Clock
            </button>
        `;

    } else if (type === "D") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>Data (D)</label>
                <button id="inputD" onclick="toggleFlipInput('D')">0</button>
            </div>

            <button class="simulate-button" onclick="simulateFlipFlop()">
                Apply Clock
            </button>
        `;

    } else if (type === "JK") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>J</label>
                <button id="inputJ" onclick="toggleFlipInput('J')">0</button>
            </div>

            <div class="input-group">
                <label>K</label>
                <button id="inputK" onclick="toggleFlipInput('K')">0</button>
            </div>

            <button class="simulate-button" onclick="simulateFlipFlop()">
                Apply Clock
            </button>
        `;

    } else if (type === "T") {

        inputArea.innerHTML = `
            <div class="input-group">
                <label>T</label>
                <button id="inputT" onclick="toggleFlipInput('T')">0</button>
            </div>

            <button class="simulate-button" onclick="simulateFlipFlop()">
                Apply Clock
            </button>
        `;
    }
}


// ---------- TOGGLE INPUT ----------

let flipInputs = {
    S: 0,
    R: 0,
    D: 0,
    J: 0,
    K: 0,
    T: 0
};

function toggleFlipInput(input) {

    flipInputs[input] = flipInputs[input] === 0 ? 1 : 0;

    const button = document.getElementById("input" + input);

    if (button) {
        button.textContent = flipInputs[input];
    }
}


// ---------- SIMULATE ----------

function simulateFlipFlop() {

    const type = document.getElementById("flipFlopSelect").value;

    if (type === "SR") {

        const S = flipInputs.S;
        const R = flipInputs.R;

        if (S === 0 && R === 0) {
            // Hold
        }
        else if (S === 1 && R === 0) {
            flipFlopQ = 1;
        }
        else if (S === 0 && R === 1) {
            flipFlopQ = 0;
        }
        else {
            document.getElementById("flipFlopOutput").textContent =
                "INVALID";
            return;
        }

    }

    else if (type === "D") {

        flipFlopQ = flipInputs.D;

    }

    else if (type === "JK") {

        const J = flipInputs.J;
        const K = flipInputs.K;

        if (J === 0 && K === 0) {
            // Hold
        }
        else if (J === 0 && K === 1) {
            flipFlopQ = 0;
        }
        else if (J === 1 && K === 0) {
            flipFlopQ = 1;
        }
        else {
            flipFlopQ = flipFlopQ === 0 ? 1 : 0;
        }

    }

    else if (type === "T") {

        if (flipInputs.T === 1) {
            flipFlopQ = flipFlopQ === 0 ? 1 : 0;
        }
    }

    document.getElementById("flipFlopOutput").textContent =
        "Q = " + flipFlopQ;
}


// ---------- RESET ----------

function resetFlipFlop() {

    flipFlopQ = 0;

    flipInputs = {
        S: 0,
        R: 0,
        D: 0,
        J: 0,
        K: 0,
        T: 0
    };

    updateFlipFlop();

    document.getElementById("flipFlopOutput").textContent =
        "Q = 0";
}
// ========================================
// JK CLOCK SIMULATOR
// ========================================

let clockQ = 0;
let clockCycle = 0;

function openClockSimulator() {

    const moduleArea = document.getElementById("simulator");

    clockQ = 0;
    clockCycle = 0;

    moduleArea.innerHTML = `
        <div class="section-heading">
            <p class="tag">SEQUENTIAL LOGIC</p>
            <h2>JK Flip-Flop Clock Simulator</h2>
            <p>Apply clock pulses and observe the output state.</p>
        </div>

        <div class="gate-panel">

            <div class="input-group">
                <label>J</label>
                <button id="clockJ" onclick="toggleClockInput('J')">0</button>
            </div>

            <div class="input-group">
                <label>K</label>
                <button id="clockK" onclick="toggleClockInput('K')">0</button>
            </div>

            <button class="simulate-button" onclick="applyClock()">
                ↑ APPLY CLOCK
            </button>

            <button class="reset-button" onclick="resetClock()">
                RESET
            </button>

            <div class="output-box">
                <div class="output-label">CURRENT Q</div>
                <div id="clockOutput">Q = 0</div>
            </div>

            <div id="clockTableContainer">
                <table class="truth-table">
                    <tr>
                        <th>CLOCK</th>
                        <th>J</th>
                        <th>K</th>
                        <th>Q</th>
                    </tr>
                </table>
            </div>

        </div>
    `;
}


let clockInputs = {
    J: 0,
    K: 0
};


function toggleClockInput(input) {

    clockInputs[input] =
        clockInputs[input] === 0 ? 1 : 0;

    document.getElementById("clock" + input).textContent =
        clockInputs[input];
}


function applyClock() {

    const J = clockInputs.J;
    const K = clockInputs.K;

    // JK flip-flop operation

    if (J === 0 && K === 0) {
        // Hold state
    }
    else if (J === 0 && K === 1) {
        clockQ = 0;
    }
    else if (J === 1 && K === 0) {
        clockQ = 1;
    }
    else {
        clockQ = clockQ === 0 ? 1 : 0;
    }

    clockCycle++;

    document.getElementById("clockOutput").textContent =
        "Q = " + clockQ;

    const table = document.querySelector(
        "#clockTableContainer table"
    );

    const row = table.insertRow(-1);

    row.insertCell(0).textContent = clockCycle;
    row.insertCell(1).textContent = J;
    row.insertCell(2).textContent = K;
    row.insertCell(3).textContent = clockQ;
}


function resetClock() {

    clockQ = 0;
    clockCycle = 0;

    clockInputs = {
        J: 0,
        K: 0
    };

    document.getElementById("clockOutput").textContent =
        "Q = 0";

    document.getElementById("clockJ").textContent = "0";
    document.getElementById("clockK").textContent = "0";

    const table = document.querySelector(
        "#clockTableContainer table"
    );

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}
// ========================================
// 4-BIT BINARY COUNTER
// ========================================

let counterValue = 0;
let counterCycle = 0;

function openCounter() {

    const moduleArea = document.getElementById("simulator");

    counterValue = 0;
    counterCycle = 0;

    moduleArea.innerHTML = `
        <div class="section-heading">
            <p class="tag">SEQUENTIAL LOGIC</p>
            <h2>4-Bit Binary Counter</h2>
            <p>Apply clock pulses to advance the binary counter.</p>
        </div>

        <div class="gate-panel">

            <div class="output-box">
                <div class="output-label">CURRENT COUNT</div>
                <div id="counterOutput">0000</div>
            </div>

            <button class="simulate-button" onclick="applyCounterClock()">
                ↑ APPLY CLOCK
            </button>

            <button class="reset-button" onclick="resetCounter()">
                RESET
            </button>

            <div id="counterTableContainer">

                <table class="truth-table">

                    <tr>
                        <th>CLOCK</th>
                        <th>Q3</th>
                        <th>Q2</th>
                        <th>Q1</th>
                        <th>Q0</th>
                    </tr>

                </table>

            </div>

        </div>
    `;
}


function applyCounterClock() {

    // 4-bit counter: 0 to 15
    counterValue = (counterValue + 1) & 15;

    counterCycle++;

    const binary = counterValue
        .toString(2)
        .padStart(4, "0");

    document.getElementById("counterOutput").textContent =
        binary;

    const table = document.querySelector(
        "#counterTableContainer table"
    );

    const row = table.insertRow(-1);

    row.insertCell(0).textContent = counterCycle;
    row.insertCell(1).textContent = binary[0];
    row.insertCell(2).textContent = binary[1];
    row.insertCell(3).textContent = binary[2];
    row.insertCell(4).textContent = binary[3];
}


function resetCounter() {

    counterValue = 0;
    counterCycle = 0;

    document.getElementById("counterOutput").textContent =
        "0000";

    const table = document.querySelector(
        "#counterTableContainer table"
    );

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}
// ========================================
// 4-BIT ALU
// ========================================

function openALU() {

    const moduleArea = document.getElementById("simulator");

    moduleArea.innerHTML = `
        <div class="section-heading">
            <p class="tag">ARITHMETIC LOGIC UNIT</p>
            <h2>4-Bit ALU</h2>
            <p>Perform arithmetic and logical operations on 4-bit values.</p>
        </div>

        <div class="gate-panel alu-panel">

            <div class="input-group">
                <label>Input A</label>
                <input
                    type="text"
                    id="aluA"
                    maxlength="4"
                    placeholder="0000"
                >
            </div>

            <div class="input-group">
                <label>Input B</label>
                <input
                    type="text"
                    id="aluB"
                    maxlength="4"
                    placeholder="0000"
                >
            </div>

            <div class="gate-selector">

                <label>Select Operation</label>

                <select id="aluOperation">

                    <option value="ADD">ADD</option>
                    <option value="SUBTRACT">SUBTRACT</option>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="XOR">XOR</option>
                    <option value="NOT">NOT A</option>

                </select>

            </div>

            <button class="simulate-button" onclick="calculateALU()">
                CALCULATE
            </button>

            <div class="output-box">

                <div class="output-label">ALU RESULT</div>

                <div id="aluOutput">
                    0000
                </div>

            </div>

            <div id="aluMessage"></div>

        </div>
    `;
}


// ---------- ALU CALCULATION ----------

function calculateALU() {

    const aText = document.getElementById("aluA").value;
    const bText = document.getElementById("aluB").value;

    const operation =
        document.getElementById("aluOperation").value;

    const output =
        document.getElementById("aluOutput");

    const message =
        document.getElementById("aluMessage");


    // Validate A

    if (!/^[01]{4}$/.test(aText)) {

        output.textContent = "----";

        message.textContent =
            "Invalid Input A. Enter exactly 4 binary digits.";

        return;
    }


    // B is not required for NOT

    if (
        operation !== "NOT" &&
        !/^[01]{4}$/.test(bText)
    ) {

        output.textContent = "----";

        message.textContent =
            "Invalid Input B. Enter exactly 4 binary digits.";

        return;
    }


    const A = parseInt(aText, 2);

    const B =
        operation === "NOT"
            ? 0
            : parseInt(bText, 2);


    let result;


    switch (operation) {

        case "ADD":

            result = (A + B) & 15;

            break;


        case "SUBTRACT":

            result = (A - B) & 15;

            break;


        case "AND":

            result = A & B;

            break;


        case "OR":

            result = A | B;

            break;


        case "XOR":

            result = A ^ B;

            break;


        case "NOT":

            result = (~A) & 15;

            break;
    }


    output.textContent =
        result.toString(2).padStart(4, "0");

    message.textContent =
        "Operation completed successfully.";
}