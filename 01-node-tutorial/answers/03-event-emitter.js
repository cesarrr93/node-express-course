const EventEmmiter = require('events');

const customEmitter = new EventEmmiter()

customEmitter.on('response', (name, id) => {
    console.log(`data recieved ${name} with id: ${id}`)
})

customEmitter.on('response', () => {
    console.log(`some other logic here `)
})
// .emit('response) this has to match to emiter.on
customEmitter.emit('response', 'john', 34)

