const initialSchedule = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
];

const scheduleKey = 'schedule';

if (!getLsSchedule()) {
    saveSchedule(initialSchedule);
} 

const contentEl = document.querySelector('.content');
const schedule = getLsSchedule();

schedule.forEach(lesson => {
    contentEl.insertAdjacentHTML("beforeend", getLessonHTML(lesson))
});

contentEl.addEventListener('click', ({target}) => {
    if (target.closest('.singUp-btn')) {
        const lessonEl = target.closest('.lesson');
        const lessonId = lessonEl.dataset.id;
        const schedule = getLsSchedule();
        const lessonToSing = schedule.find(lesson => lesson.id === Number(lessonId));

        if (!lessonToSing) {
            alert('Занятие не найдено!');
            return;
        }
        
        if (lessonToSing.currentParticipants + 1 > lessonToSing.maxParticipants) {
            alert('Запись невозможна. Достигнуто максимальное число участников!');
            return;
        }

        lessonToSing.currentParticipants += 1;
        saveSchedule(schedule);
        const currentPart = lessonEl.querySelector('.number-part');
        currentPart.textContent = lessonToSing.currentParticipants;
        target.closest('.singUp-btn').disabled = true;
        const cancelBtn = lessonEl.querySelector('.cancel-btn');
        cancelBtn.disabled = false;
        
    }

    

});
contentEl.addEventListener('click', ({target}) => {
    if (target.closest('.cancel-btn')) {
        const lessonEl = target.closest('.lesson');
        const lessonId = lessonEl.dataset.id;
        const schedule = getLsSchedule();
        const lessonToSing = schedule.find(lesson => lesson.id === Number(lessonId));

        if (!lessonToSing) {
            alert('Занятие не найдено!');
            return;
        }
        
        lessonToSing.currentParticipants -= 1;
        saveSchedule(schedule);
        const currentPart = lessonEl.querySelector('.number-part');
        currentPart.textContent = lessonToSing.currentParticipants;
        const singUpBtn = lessonEl.querySelector('.singUp-btn');
        singUpBtn.disabled = false;
        target.closest('.cancel-btn').disabled = true;
        
    }
});

//У меня почему-то ошибка при работе с модулями, поэтому работа с localStorage отдельно не вынесена. Пока не разобралась почему выдает ошибку
function getLsSchedule() {
    return JSON.parse(localStorage.getItem(scheduleKey))
}

function saveSchedule(schedule) {
    localStorage.setItem(scheduleKey, JSON.stringify(schedule));
}

function getLessonHTML(lesson) {
    return `<div class="lesson" data-id="${lesson.id}">
    <h3 class="name-lesson">${lesson.name}</h3>
    <p class="time-lesson">Время проведения занятия: ${lesson.time}</p>
    <p class="max-participants">Максимальное количество участников: <span class="max">${lesson.maxParticipants}</span></p>
    <p class="current-participants">Текущее количество участников:<span class="number-part">${lesson.currentParticipants}</span></p>
    <button class="singUp-btn">Записаться</button>
    <button class="cancel-btn">Отменить запись</button>
    <br>
</div>`;
}