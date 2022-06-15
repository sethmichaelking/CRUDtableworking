console.log('in window')
const prospectList = document.querySelector('#prospect-list')
const modalForm = document.querySelector('#modal_form')
const firstname = document.querySelector('#firstname')
const lastname = document.querySelector('#lastname')
const submitter = document.querySelector("#modal")
const secondModal = document.querySelector('#modal_form2')
const updateFirstVal = document.querySelector('#firstnameUpdate')
const updateSecondtVal = document.querySelector('#lastnameUpdate')

console.log(secondModal)

prospectList.addEventListener('click', async(ev)=>{
    if(ev.target.tagName === 'BUTTON'){
        const idx = ev.target.getAttribute('data-id')
        await axios.delete(`/api/prospects/${idx}`)
        await fetchProspects()
    }
})

prospectList.addEventListener('click', async(ev)=>{
   try {
        if (ev.target.tagName === 'BUTTON'){
            const idx = ev.target.getAttribute('second-data-id')
            debugger;
            secondModal.addEventListener('submit', async()=>{
                const firstName = updateFirstVal.value
                const lastName = updateSecondtVal.value
                await axios.put(`/api/prospects/${idx}`, {
                    firstName,
                    lastName
                })
            })
        }
    }
    catch(err){
        console.log(err)
    }
}) 

const state = {

}


const addtoModal = async()=>{
    console.log('modal')
}

modalForm.addEventListener('submit', async(ev)=>{
    const firstName = firstname.value
    const lastName = lastname.value
    await axios.post("/api/prospects", {
        lastName,
        firstName,
    })
    fetchProspects()
})

const renderProspects = async() => {
    const html = state.prospects.map(prospect => {
        return `
            <li>
                ${prospect.firstName} ${prospect.lastName} (id=${prospect.id})
                <button class="btn btn-danger" data-id=${prospect.id}> X </button>
                <button type="button" second-data-id="${prospect.id}" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter">
                Update
               </button>
            </li>
        `
    }).join('')
    prospectList.innerHTML = html
}

const fetchProspects = async () =>{
    const response = await axios.get("/api/prospects")
    const prospects = response.data
    state.prospects = prospects
    state.amount = prospects.length
    renderProspects()
}

const start = async() =>{
    fetchProspects()
}

start()