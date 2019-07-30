function displayAllTickets(student) {
    const myTickets = document.getElementById('my-tickets')
    myTickets.innerHTML = ''
    student.tickets.forEach(ticket => {
        displayTicket(ticket)
    })
}

function displayTicket(ticket) {
    const myTickets = document.getElementById('my-tickets')
    myTickets.innerHTML += `
        <div class="my-event">
            <h3>${ticket.event.title}</h3>
            <p>${ticket.event.location} | ${displayDate(ticket.event.start)}</p>
            <button class="del-ticket" data-id=${ticket.id}>Cancel event</button>
        </div>`
}

function createTicket(student) {
    const eventBlock = document.getElementById('events')
    eventBlock.addEventListener('click', function(e){
        if (e.target.classList.contains('sign-up-event')){
            const eventId = e.target.dataset.id
            const studentId = localStorage.getItem('user_id')
            /** creating a ticket once clicked sign up button */
            let body = {
                student_id: studentId,
                event_id: eventId
            }
            ticketAdapter.post(body)
            .then(ticket => {
                console.log(`added event: ` + `${ticket.event.title}`)
                displayTicket(ticket)
                let eventDiv = document.querySelector('div#events')
                eventDiv.innerHTML = ''
                displayAllEvents(studentId)
                calendar.addEvent(ticket.event)
            })
        }
    })
}

function removeTicket(studentId, calendar) {
    const myTickets = document.getElementById('my-tickets')
    const eventBlock = document.getElementById('events')

    myTickets.addEventListener('click', function(e){
        if (e.target.className === 'del-ticket') {
            const ticketId = e.target.dataset.id

            /** deleting event from calendar */
            ticketAdapter.get(ticketId)
            .then(ticket => {
                const eventId = ticket.event.id
                const event = calendar.getEventById(eventId)
                event.remove()
            })

            ticketAdapter.delete(ticketId)
            .then(event => {
                e.target.parentElement.remove()
                eventBlock.innerHTML = ''
                displayAllEvents(studentId)
            })
        }
    })
}