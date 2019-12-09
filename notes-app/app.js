const yargs= require('yargs')
const chalk = require('chalk')
const notesUtils= require('./notes.js')

//creating a command for adding a note

yargs.command({
    command: 'add',
    describe: 'adds a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: String
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: String
        }
    },
    handler(argv){
        notesUtils.addNotes(argv.title,argv.body)
    }
})

//creating a command for removing a note

yargs.command({
    command: 'remove',
    description: 'removes a note',
    builder:{
        title:{
            describe: 'note title',
            demandOption: true,
            type: String
        }
    },
    handler(argv){
        notesUtils.removeNote(argv.title)
    }
})



//creating a command for listing all notes

yargs.command({
    command: 'list',
    description: 'lists all the notes',
    handler(argv){
        notesUtils.listNotes()
    }
})

//creating a command for reading a note

yargs.command({
    command: 'read',
    description: 'reads a note',
    handler(argv){
        notesUtils.readNote(argv.title)
    },
    builder:{
        title:{
            describe:"Note title",
            demandOption:true,
            type: String
        }
    }
})


yargs.parse();    