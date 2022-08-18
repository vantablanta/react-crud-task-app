import React, {useState} from 'react'

function AddTask ({onAdd}) {
    const[text, setText] = useState("")
    const[day, setDay] = useState("")
    const[reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert("Please Add Task")
            return
        }

        onAdd({text, day, reminder})

        setText("")
        setDay("")
        setReminder(false)
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input 
                type='text' 
                placeholder='Add Task' 
                value={text} 
                onChange={ (event) => setText(event.target.value)}
            />
        </div>
        <div className='form-control'>
            <label>Day & Time </label>
            <input 
                type='text' 
                placeholder='Add Date and Time'
                value={day} 
                onChange={ (event) => setDay(event.target.value)}
            />
        </div>
        <div className='form-control form-control-check'>
            <label>Reminder</label>
            <input 
                type='checkbox'
                checked = {reminder}
                value = {reminder}
                onChange={ (event) => setReminder(event.currentTarget.checked)} 
            />
        </div>
        <input type="submit" className='btn btn-block' value="Save" />
    </form>
  )
}

export default AddTask