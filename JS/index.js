const db = firebase.firestore()
let tasks = []
let currentUser = {}
let mes = {}

function getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser.uid = user.uid
        readTasks(mes)
        let userLabel = document.getElementById("navbarDropdown")
        userLabel.innerHTML = user.email
      } else {
        swal
          .fire({
            icon: "success",
            title: "Redirecionando para tela de autenticação",
          })
          .then(() => {
            setTimeout(() => {
              window.location.replace("login.html")
            }, 1000)
          })
      }
    })
  }
  
  function createDelButton(task) {
    const newButton = document.createElement("button")
    newButton.setAttribute("class", "btn btn-primary")
    newButton.appendChild(document.createTextNode("Excluir"))
    newButton.setAttribute("onclick", `deleteTask("${task.id}")`)
    return newButton
  }
  function renderTasks() {
    let itemList = document.getElementById("itemList")
    itemList.innerHTML = ""
    for (let task of tasks) {
      const newItem = document.createElement("li")
      newItem.setAttribute(
        "class",
        "list-group-item d-flex justify-content-between",
      )
      newItem.appendChild(document.createTextNode(task.title))
      newItem.appendChild(createDelButton(task))
      itemList.appendChild(newItem)
    }
  }
  
  async function readTasks(mes) {
    tasks = []
    const logTasks = await db
      .collection("tasks")
      .where("owner", "==", currentUser.uid) 
      //.where("month", "==", mes) 
      .get()
    for (doc of logTasks.docs) {
      tasks.push({
        id: doc.id,
        title: doc.data().title,
      })
    }
    renderTasks()
  }
  
  async function addTask(mes) {
    const itemList = document.getElementById("itemList")
    const newItem = document.createElement("li")
    newItem.setAttribute("class", "list-group-item")
    newItem.appendChild(document.createTextNode("Adicionando..."))
    itemList.appendChild(newItem)

    const title = document.getElementById("newItem").value
    
  await db.collection("tasks").add({
    title: title,
    owner: currentUser.uid,
    month: mes,

  })
  
  readTasks(mes)
}

async function deleteTask(id) {
    await db.collection('tasks').doc(id).delete()
    readTasks(mes)
  }
    

  window.onload = function () {
    getUser()
   
  }
  