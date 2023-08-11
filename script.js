document.addEventListener("DOMContentLoaded", function () {
     const questions = [ 
       
        { 
             question: " Instrumento musical de percusión de interpretación individual o colectiva. Se cree que la marimba guatemalteca surgió a finales del siglo XVII, \ncuando esclavos africanos la fabricaron en estas tierras.\n  ¿De qué árbol se fabrica la Marimba?\n\n",    
            options:  ["CEIBA", "HORMIGO", "CHICOZAPOTE"], 
            answer: "HORMIGO" 
        },
      
        { 
            question : "¿Quién es el autor de Luna de Xelajú?",
            options: ["FRANCISCO PEREZ DE ANTON", "FRANCISCO PEREZ MUÑOZ","JOSE ERNESTO MONZON"], 
            answer: "FRANCISCO PEREZ MUÑOZ"
        },
        { 
            question: "Gran capitán quiché. Enfrentó al ejército invasor español en 1524. Algunos historiadores señalan que solo es el símbolo de la defensa de la soberanía del territorio durante la Conquista. ¿Quién era?", 
            options: ["\n KAIBIL BALAM", "TECUN UMAN", "ATANASIO TZUL"], 
            answer: "TECUN UMAN" 
        },
        { 
            question: "¿Qué tipo de flor es la Monja Blanca?", 
            options: ["ORQUIDEA", "CRISANTEMO", "ANEMONA"], 
            answer: "ORQUIDEA"
        },
        { 
            question: "¿Cuántos departamentos tiene Guatemala?", 
            options: ["22", "15", "21", "25", "23"], 
            answer: "22" 
        }
     ];


    let countdownInterval;
    let startTime;
    let answers = [];

    function startCountdown() {
        let seconds = 30;
        countdownInterval = setInterval(function () {
            const currentTime = new Date().getTime();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            const remainingSeconds = seconds - elapsedTime;
            document.getElementById("countdown").innerText = `Tiempo restante: ${remainingSeconds} segundos`;
            if (remainingSeconds <= 0) {
                clearInterval(countdownInterval);
                document.getElementById("countdown").innerText = "Tiempo terminado";
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("retryBtn").disabled = false;
                showAlert();
            }
        }, 1000);
    }

    function showAlert() {
        const correctAnswers = questions.filter((q, index) => answers[index].toLowerCase() === q.answer.toLowerCase());
        const incorrectAnswers = questions.filter((q, index) => answers[index].toLowerCase() !== q.answer.toLowerCase());
        let message = "Tiempo FINALIZADO. Respuestas enviadas:\n";
        if (correctAnswers.length === 0) {
            message += "NINGUNA RESPUESTA CORRECTA";
        } else {
            message += "Respuestas correctas:\n";
            correctAnswers.forEach((q) => {
                message += `${q.question}: ${q.answer}\n`;
            });
            if (incorrectAnswers.length > 0) {
                message += "\nRespuestas incorrectas:\n";
                incorrectAnswers.forEach((q) => {
                    message += `${q.question}: ${answers[questions.indexOf(q)]}\n`;
                });
            }
        }
        alert(message);
    }

    function resetForm() {
        clearInterval(countdownInterval);
        document.getElementById("questionForm").reset();
        document.getElementById("countdown").innerText = "";
        document.getElementById("submitBtn").disabled = true;
        document.getElementById("retryBtn").disabled = true;
        document.getElementById("startBtn").disabled = false;
        answers = [];
    }

    function generateQuestions() {
        const form = document.getElementById("questionForm");
        const questionDivs = form.getElementsByClassName("question");
        if (questionDivs.length === 0) {
            questions.forEach((q, index) => {
                const questionDiv = document.createElement("div");
                questionDiv.className = "question";
                const options = q.options.map(option => `<option value="${option}">${option}</option>`).join('');
                questionDiv.innerHTML = `<label>${q.question}</label><select name="answer${index + 1}" required><option value="" disabled selected>Selecciona una opción</option>${options}</select>`;
                form.appendChild(questionDiv);
            });
        }
    }

    document.getElementById("startBtn").addEventListener("click", function () {
        startTime = new Date().getTime();
        startCountdown();
        this.disabled = true;
        document.getElementById("submitBtn").disabled = false;
        document.getElementById("retryBtn").disabled = true;
        generateQuestions();
    });

    document.getElementById("questionForm").addEventListener("change", function () {
        if (this.checkValidity()) {
            document.getElementById("submitBtn").disabled = false;
        } else {
            document.getElementById("submitBtn").disabled = true;
        }

        
        answers = [];
        const selects = document.getElementsByTagName("select");
        for (let i = 0; i < selects.length; i++) {
            answers.push(selects[i].value.toLowerCase());
        }
    });

    document.getElementById("submitBtn").addEventListener("click", function () {
        clearInterval(countdownInterval);
        showAlert();
        document.getElementById("retryBtn").disabled = false;
    });

    document.getElementById("retryBtn").addEventListener("click", function () {
        resetForm();
    });
});