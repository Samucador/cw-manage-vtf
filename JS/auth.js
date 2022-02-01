
function login() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut()

}
const email = document.getElementById("email").value
const password = document.getElementById("password").value
firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
          swal
            .fire({
             icon: "success",
             title: "Login realizado com sucesso",
        })
    .then(() => {
     setTimeout(() => {
            window.location.replace("index.html")
            }, 1000)
        })
    })
    .catch((error) => {
        const errorCode = error.code
        switch (errorCode) {
          case "auth/wrong-password":
            swal.fire({
              icon: "error",
              title: "A Senha selecionada é inválida",
            })
            break
          case "auth/invalid-email":
            swal.fire({
              icon: "error",
              title: "Este E-mail é inválido",
            })
            break
          case "auth/user-not-found":
                swal
                  .fire({
                    icon: "warning",
                    title: "Usuário não encontrado",
                    text: "Crie um novo usuário:",
                    showCancelButton: true,
                    cancelButtonText: "Não",
                    cancelButtonColor: "#808080",
                    confirmButtonText: "Sim",
                    confirmButtonColor: "#26aab",
                  })
                  .then((result) => {
                    if (result.value) {
                      signUp(email, password)
                    }
                  })
                break
              default:
                swal.fire({
                  icon: "error",
                  title: error.message,
                })
            }
          })
      }
     
      function signUp(email, password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            swal
              .fire({ icon: "success", title: "Usuário criado com sucesso" })
              .then(() => {
                setTimeout(() => {
                  window.location.replace("index.html")
                }, 1000)
              })
          })
          .catch((error) => {
            const errorCode = error.code
            switch (errorCode) {
              case "auth/weak-password":
                swal.fire({
                  icon: "error",
                  title: "Sua senha é muito fraca",
                })
                break
              default:
                swal.fire({
                  icon: "error",
                  title: error.message,
                })
            }
          })
      }
      function logout() {
        firebase.auth().signOut()
      }
      
         