const questions = [
    {
        title: "What is your current living environment?",
        options: [
            { text: "Apartment or condo (limited space)", value: "cat_chill" },
            { text: "House with a fenced yard", value: "dog_active" },
            { text: "Shared housing or studio", value: "cat_playful" },
            { text: "Quiet space with no yard", value: "dog_chill" }
        ]
    },
    {
        title: "How much daily free time can you dedicate to exercise & care?",
        options: [
            { text: "30–45 mins (quick walks & cuddle time)", value: "dog_chill" },
            { text: "1–2 hours (active walks & daily play)", value: "cat_playful" },
            { text: "2+ hours (hiking, running, high energy)", value: "dog_active" },
            { text: "Flexible/Minimal (independent companion)", value: "cat_chill" }
        ]
    },
    {
        title: "What is your experience level with pets?",
        options: [
            { text: "First-time owner looking for a smooth start", value: "cat_chill" },
            { text: "Some experience with easygoing companions", value: "dog_chill" },
            { text: "Experienced owner ready for training & play", value: "dog_active" },
            { text: "Love interactive personalities and indoor fun", value: "cat_playful" }
        ]
    },
    {
        title: "What vibe do you look for in a pet?",
        options: [
            { text: "A calm, affectionate couch buddy", value: "cat_chill" },
            { text: "An adventurous outdoor partner", value: "dog_active" },
            { text: "A gentle, loyal friend for relaxed walks", value: "dog_chill" },
            { text: "A playful, curious, and entertaining friend", value: "cat_playful" }
        ]
    }
];

const petResults = {
    dog_active: {
        name: "Milo & Active Pups",
        type: "High-Energy Rescue Dog",
        img: "https://images.unsplash.com/photo-1534361960057-19889db98d18?auto=format&fit=crop&w=400&q=80",
        tags: ["Adventurous", "Playful", "Loves Hiking"],
        description: "Your active lifestyle and spacious living arrangement make you a perfect fit for an energetic rescue dog like Milo! High-energy dogs love outdoor adventures, training games, and running."
    },
    dog_chill: {
        name: "Barnaby & Gentle Giants",
        type: "Senior or Calm Rescue Dog",
        img: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80",
        tags: ["Calm", "Loyal", "Gentle Walk Companion"],
        description: "You prefer a relaxed companion! A senior rescue dog or low-energy mix like Barnaby would thrive in your care. They ask for cozy naps, warm affection, and peaceful daily strolls."
    },
    cat_playful: {
        name: "Cleo & Playful Felines",
        type: "Interactive & Young Cat",
        img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
        tags: ["Curious", "Interactive", "Full of Energy"],
        description: "You have plenty of indoor enthusiasm to share! Playful rescue cats like Cleo love puzzle toys, climbing towers, and engaging playtime without requiring a large backyard."
    },
    cat_chill: {
        name: "Luna & Easygoing Cats",
        type: "Independent Rescue Cat",
        img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80",
        tags: ["Independent", "Cuddle Bug", "Apartment-Friendly"],
        description: "An easygoing cat like Luna is your ideal match! Perfect for first-time owners or compact spaces, quiet rescue cats offer affectionate companionship and effortless care routines."
    }
};

let currentQuestion = 0;
let scores = { dog_active: 0, dog_chill: 0, cat_playful: 0, cat_chill: 0 };

function startQuiz() {
    document.getElementById("startScreen").classList.remove("active");
    document.getElementById("quizScreen").classList.add("active");
    document.getElementById("progressContainer").style.display = "block";
    currentQuestion = 0;
    scores = { dog_active: 0, dog_chill: 0, cat_playful: 0, cat_chill: 0 };
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("questionTitle").innerText = q.title;
    
    const optionsList = document.getElementById("optionsList");
    optionsList.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `<span>${option.text}</span> <span>→</span>`;
        btn.onclick = () => selectOption(option.value);
        optionsList.appendChild(btn);
    });

    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progressBar").style.width = `${progressPercent}%`;
}

function selectOption(val) {
    scores[val] += 1;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizScreen").classList.remove("active");
    document.getElementById("progressContainer").style.display = "none";
    document.getElementById("resultScreen").classList.add("active");

    const topMatch = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
    const resultData = petResults[topMatch];

    document.getElementById("petImg").src = resultData.img;
    document.getElementById("petName").innerText = resultData.name;
    document.getElementById("petType").innerText = resultData.type;
    document.getElementById("petDescription").innerText = resultData.description;

    const tagsContainer = document.getElementById("petTags");
    tagsContainer.innerHTML = "";
    resultData.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.innerText = tag;
        tagsContainer.appendChild(span);
    });
}

function restartQuiz() {
    document.getElementById("resultScreen").classList.remove("active");
    document.getElementById("startScreen").classList.add("active");
}
