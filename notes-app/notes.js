const chalk= require('chalk')
const fs= require('fs')

const addNotes=(title,body)=>{
       const notes= loadNotes()
 
       const duplicateNotes= notes.filter((note)=> note.title===title)

       debugger
       
       if(duplicateNotes.length===0){
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes);
        console.log(chalk.green('Note added succesfully!'))
       } else {
           console.log('Note title taken')
       }
       
}
const saveNotes=(notes)=>{
    const dataJSON= JSON.stringify(notes)
    fs.writeFileSync('myNotes.js',dataJSON)
}
const loadNotes= () =>{
    try{
        const dataBuffer= fs.readFileSync('myNotes.js')
        const dataJSON= dataBuffer.toString()
        const data= JSON.parse(dataJSON)
        return data;
    }catch(e){
        return [];
    }
}


const removeNote= (title)=>{
     const notes= loadNotes()
     if(notes.length===0){
         console.log(chalk.red("nothing to delete"))
         return
     }
     const reqNotes= notes.filter((note)=>(note.title!==title))
     const deleteNote= notes.filter(function(note){
         return note.title===title
     })
     if(deleteNote.length===0){
         console.log(chalk.red.inverse("No matching note"))
         return
     }

    
     saveNotes(reqNotes) 
     console.log(chalk.green.inverse("Note deleted succesfully"))
}

const listNotes=()=>{
    const notes= loadNotes()
    console.log(chalk.green.inverse("Your notes"))
    notes.forEach( (note)=> {
        console.log("Title: "+ note.title+ " Body: "+ note.body)
    });
}

const readNote=(title)=>{
    const notes= loadNotes()
    const reqNote= notes.find((note)=> note.title===title )
    if(reqNote){
        console.log(chalk.blue.inverse("Title: "+ reqNote.title))
        console.log(chalk.blue.yellow("Body: "+ reqNote.body))
    } else {
        console.log(chalk.red.inverse(("Note not found!")))
        return 
    }
}

module.exports= {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}