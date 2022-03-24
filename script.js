const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sColab = document.querySelector('#m-colab')
const sCpf = document.querySelector('#m-cpf')
const sCafe = document.querySelector('#m-cafe')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sColab.value = itens[index].nome
    sCpf.value = itens[index].cpf
    sCafe.value = itens[index].cafe
    id = index
  } else {
    sColab.value = ''
    sCpf.value = ''
    sCafe.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cpf}</td>
    <td>${item.cafe}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sColab.value == '' || sCpf.value == '' || sCafe.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sColab.value
    itens[id].cpf = sCpf.value
    itens[id].cafe = sCafe.value
  } else {
    itens.push({'nome': sColab.value, 'cpf': sCpf.value, 'cafe': sCafe.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()