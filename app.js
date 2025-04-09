const btn = document.querySelector("button")
const inpucik = document.querySelector("input")
const paragraf = document.querySelector("p")
const div = document.getElementById("divek")
const pass = document.getElementById("pass") 
const btnpass = document.getElementById("btnpass")
const numInput = document.getElementById("pass-num")
const btncopy = document.getElementById("btncopy")

function renderSpinner(el) {
  const markup = `
    <div class="spinner">
        <img src="spinner.png">
    </div>
  `
  el.innerHTML = ""
  el.insertAdjacentHTML("afterbegin", markup)
}

btn.addEventListener("click", e => {
  paragraf.innerHTML = ""
  div.innerHTML = ""
  e.preventDefault()
  const str = inpucik.value

  renderSpinner(paragraf)
  setTimeout(() => {
    if (!str) {
      return (paragraf.innerHTML = "<h2>Nie podano hasła!</h2>")
    }
    let i = 0
    let errs = []
    if (!(str.length >= 8)) {
      errs.push("Hasło musi zawierać co najmniej 8 liter.")
      i++
    }
    if (!/[A-Z]/.test(str)) {
      errs.push("Hasło musi zawierać co najmniej jedną dużą literę.")
      i++
    }

    if (!/[a-z]/.test(str)) {
      errs.push("Hasło musi zawierać co najmniej jedną małą literę.")
      i++
    }

    if (!/\d/.test(str)) {
      errs.push("Hasło musi zawierać co najmniej jedną cyfrę.")
      i++
    }

    if (!/[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<\.>\/\?\\|`~]/.test(str)) {
      errs.push("Hasło musi zawierać co najmniej jeden znak specjalny.")
      i++
    }
    paragraf.innerHTML = ""
    div.innerHTML = ""
    if (i > 0) {
      const markupErrs = `<h2>❌Twoje hasło nie spełnia wymagań!❌</h2>`

      paragraf.innerHTML = markupErrs
    } else if (i == 0) {
      const markup = `<h2>✅Twoje hasło spełnia wymagania!✅</h2>`

      paragraf.innerHTML = markup
    } else {
      console.error("")
    }

    errs.forEach(err => {
      const markup = `<div id="es"> ${err} </div>`
      div.innerHTML += markup
    })

    errs = []

    return "Hasło jest silne."
  }, 500)
})

btnpass.addEventListener("click", e => {
  e.preventDefault()
  pass.innerHTML = ""
  renderSpinner(pass)
  setTimeout(() => {
    const length = numInput.value < 8 ? 8 : numInput.value

    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""

    const isSpecialChar = (char) =>
      /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<\.>\/\?\\|`~]/.test(char)

    let meetsRequirements = false
    while (!meetsRequirements) {
      password = ""
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        password += chars[randomIndex]
      }

      if (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        isSpecialChar(password)
      ) {
        meetsRequirements = true
      }
    }

    pass.innerHTML = `<h2>${password}</h2>`
    btncopy.style.display = "block"
  }, 500)
})

btncopy.addEventListener("click", (e) => {
  e.preventDefault()
  const passText = pass.querySelector("h2")
  const passwordText = passText.innerText
  const tempInput = document.createElement("input")
  tempInput.value = passwordText
  document.body.appendChild(tempInput)

  tempInput.select()
  document.execCommand("copy")
  document.body.removeChild(tempInput)

  btncopy.textContent = "Skopiowano!"

  setTimeout(() => {
    btncopy.textContent = "kopiuj"
  }, 1000)
})
