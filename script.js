function openMenu() {
  document.getElementById("menu_aba").style.display = "block"; 
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";    
}

function aplicarTema(cores) {
    for (const [variavel, valor] of Object.entries(cores)) {
        document.documentElement.style.setProperty(variavel, valor);
    }
}

function temaLim() {
    aplicarTema({
        '--cor-click': '#5cb860',
        '--cor-sombra': '#3d8b40',
        '--cor-text': 'black',
        '--cor-back1': '#e9f6ea',
        '--cor-back2': '#9fcba0',
        '--md-sys-color-primary': '#5cb860',
        '--cor-card-bg': 'white',
        '--cor-text-muted': '#666',
        '--cor-input-border': '#ccc',
        '--cor-header-bg': '#e9f6ea',
        '--cor-header-fg': '#5cb860',
        '--cor-logo': '#5cb860'
    });
}

function temaInatel() {
    aplicarTema({
        '--cor-click': '#126ae2',
        '--cor-sombra': '#0a599b',
        '--cor-text': 'black',
        '--cor-back1': '#edf2f4',
        '--cor-back2': '#6a937a',
        '--md-sys-color-primary': '#126ae2',
        '--cor-card-bg': 'white',
        '--cor-text-muted': '#666',
        '--cor-input-border': '#ccc',
        '--cor-header-bg': '#126ae2',
        '--cor-header-fg': 'white',
        '--cor-logo': 'white'
    });
}

function temaDark() {
    aplicarTema({
        '--cor-click': '#126ae2',
        '--cor-sombra': '#0a599b',
        '--cor-text': 'white',
        '--cor-back1': '#1c1c1e',
        '--cor-back2': '#343437',
        '--md-sys-color-primary': '#126ae2',
        '--cor-card-bg': '#2a2a2d',
        '--cor-text-muted': '#b5b5b8',
        '--cor-input-border': '#5a5a5d',
        '--cor-header-bg': '#242426',
        '--cor-header-fg': '#126ae2',
        '--cor-logo': '#126ae2'
    });
}

const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2026',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/08',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2026',
        date: '18/08',
        time: '19:00',
        location: 'Área Esportiva',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

const carousel = document.querySelector('.carousel');

function createCards() {
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

let index = 0;
function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

setInterval(nextCard, 5000);

let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

createCards();

// Componente Aulas
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
    this.aulas = [
      { id: 1, disciplina: 'S05 - Interface Homem-máquina', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: false, prova: '12/05', frequencia: '10/25', nota: '10' },
      { id: 2, disciplina: 'E01 - Circuitos Elétricos em Corrente Contínua', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '5' },
      { id: 3, disciplina: 'M02 - Álgebra e Geometria Analítica', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '7' }
    ];
    this.hoje = "ter"; 
  }

  connectedCallback() {
    this.render(); 
  }

  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje); 
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula {
        position: relative;
        background-color: var(--cor-card-bg);
        padding: 15px;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      }
      .titulo_aula {
        font-family: "Arimo", sans-serif;
        font-weight: bold;
        font-size: 16px;
        color: var(--cor-text);
        padding: 0 5px;
      }
      p {
        font-family: "Arimo", sans-serif;
        font-size: 13px;
        color: var(--cor-text);
        line-height: 1.5;
        padding: 0 5px;
      }
      .lables { display: flex; flex-wrap: wrap; gap: 8px; }
      .lable-prova { background-color: var(--cor-click); padding: 7px 15px; margin-bottom: 10px; border-radius: 500px; text-align: center; }
      .lable-frequencia { background-color: var(--cor-click); padding: 7px 15px; border-radius: 500px; }
      
      .lable-nota-vermelho { background-color: red; padding: 7px 15px; border-radius: 500px; }
      .lable-nota-laranja { background-color: orange; padding: 7px 15px; border-radius: 500px; }
      .lable-nota-verde { background-color: green; padding: 7px 15px; border-radius: 500px; }
      
      .p_lable { font-family: "Arimo", sans-serif; font-size: 13px; color: white; white-space: nowrap; }

      @media (max-width: 600px) {
        .comp-aula { margin: 12px 0; padding: 12px; }
        .titulo_aula { font-size: 15px; }
        .lable-prova, .lable-frequencia,
        .lable-nota-vermelho, .lable-nota-laranja, .lable-nota-verde {
          padding: 5px 11px;
        }
        .p_lable { font-size: 12px; }
      }
      </style>
      <div>
        ${aulasDia.map(a => {
          let provaDisplay = a.prova_alert ? '' : 'display: none;';
          
          let classeNota = 'lable-nota-vermelho';
          let notaNumerica = Number(a.nota);

          if (notaNumerica >= 8) {
            classeNota = 'lable-nota-verde';
          } else if (notaNumerica >= 6 && notaNumerica < 8) {
            classeNota = 'lable-nota-laranja';
          }

          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="${classeNota} p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
customElements.define('aulas-component', AulasComponent);

// RESERVA ARMÁRIO
const usuario = {
  nome: "Raphael",
  matricula: "123",
  curso: "Engenharia de Software",
  periodo: 4,
  cre: 78,
  pendencia: false,
  pendenciaFinanceira: true,
  acessibilidade: true
};

const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

armarios[0].status = false;
let armarioReservadoUsuario = armarios[0];

function renderAvisos() {
  const container = document.getElementById('avisosContainer');
  if (!container) return;

  const avisos = [];

  if (armarioReservadoUsuario) {
    avisos.push({ icone: 'notifications', texto: 'Você possui um armário reservado com entrega para hoje...' });
  }
  if (usuario.pendenciaFinanceira) {
    avisos.push({ icone: 'mail', texto: 'Você possui uma pendência no financeiro...' });
  }

  if (avisos.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';
  container.innerHTML = `
    <h2 class="avisos-titulo">Olá ${usuario.nome}!</h2>
    ${avisos.map(a => `
      <div class="aviso-item">
        <span class="material-symbols-outlined">${a.icone}</span>
        <span>${a.texto}</span>
      </div>
    `).join('')}
  `;
}
renderAvisos();

let tipoSelecionado = null;

document.querySelectorAll('.tipo').forEach(div => {
  div.addEventListener('click', () => {
    document.querySelectorAll('.tipo').forEach(d => d.classList.remove('selected'));
    div.classList.add('selected');
    tipoSelecionado = div.dataset.value;
  });
});

function reservarArmario() {
  const resultado = document.getElementById("resultado");
  const armarioNumero = document.getElementById("armarioNumero");

  if (!tipoSelecionado) {
    resultado.innerText = "Por favor, selecione um tipo de armário antes de reservar.";
    armarioNumero.style.display = "none";
    return;
  }

  let armariosDisponiveis = armarios.filter(a => 
    a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel
  );

  if (armariosDisponiveis.length === 0) {
    resultado.innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    armarioNumero.style.display = "none";
    return;
  }

  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;

  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva.toLocaleString("pt-BR");

  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega.toLocaleString("pt-BR");

  usuario.pendencia = true;
  armarioReservadoUsuario = armarioEmprestado;
  renderAvisos();

  armarioNumero.innerText = `Armário Nº ${armarioEmprestado.id}`;
  armarioNumero.style.display = "block";

  resultado.innerText = 
    `Data da reserva: ${armarioEmprestado.dataReserva}\n` +
    `Data de entrega: ${armarioEmprestado.dataEntrega}`;
}

/*MÓDULO DE INTERCÂMBIO*/
function abrirIntercambio() {
  closeMenu();
  document.getElementById('painelIntercambio').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function fecharIntercambio() {
  document.getElementById('painelIntercambio').style.display = 'none';
  document.body.style.overflow = '';
}

function voltarIntercambio() {
  const comp = document.getElementById('intercambioComp');

  if (comp.editalSelecionado) {
    comp.voltarParaLista();
    return;
  }

  if (comp.aba === 'inscricoes') {
    comp.trocarAba('editais');
    return;
  }

  fecharIntercambio();
}

const StatusInscricao = {
  EM_ANALISE:   { label: 'Em Análise',              cor: 'var(--status-analise)' },
  DEFERIDO:     { label: 'Deferido',                cor: 'var(--status-deferido)' },
  INDEFERIDO:   { label: 'Indeferido',              cor: 'var(--status-indeferido)' },
  PENDENTE_DOC: { label: 'Pendência de Documento',  cor: 'var(--status-pendente)' },
  CANCELADO:    { label: 'Cancelado',               cor: 'var(--status-cancelado)' }
};

const editais = [
  {
    id: 1,
    pais: 'Alemanha',
    universidade: 'Jade University',
    cursosAceitos: ['Engenharia Elétrica', 'Engenharia de Software'],
    requisitoCRE: 70.0,
    prazoInscricao: '30/06/2026',
    idioma: 'Alemão / Inglês',
    descricao: 'Intercâmbio acadêmico com foco em desenvolvimento de firmware embarcado e algoritmos de controle para sistemas elétricos.'
  },
  {
    id: 2,
    pais: 'Portugal',
    universidade: 'Universidade do Minho',
    cursosAceitos: ['Engenharia de Computação', 'Engenharia de Software'],
    requisitoCRE: 60.0,
    prazoInscricao: '15/07/2026',
    idioma: 'Português',
    descricao: 'Programa de dupla titulação com disciplinas de sistemas embarcados e engenharia de software.'
  },
  {
    id: 3,
    pais: 'Canadá',
    universidade: 'Université Laval',
    cursosAceitos: ['Engenharia Elétrica', 'Engenharia de Telecomunicações'],
    requisitoCRE: 80.0,
    prazoInscricao: '10/08/2026',
    idioma: 'Francês / Inglês',
    descricao: 'Intercâmbio voltado à pesquisa em redes 5G e Internet das Coisas (IoT).'
  }
];

const inscricoes = [];

function mostrarNotificacao(mensagem) {
  let area = document.getElementById('toast-area');
  if (!area) {
    area = document.createElement('div');
    area.id = 'toast-area';
    document.body.appendChild(area);
  }
  const toast = document.createElement('div');
  toast.classList.add('toast-notificacao');
  toast.innerText = mensagem;
  area.appendChild(toast);

  setTimeout(() => toast.remove(), 6000);
}

class IntercambioComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.aba = 'editais';
    this.filtroPais = null;
    this.buscaUniversidade = '';
    this.editalSelecionado = null;
    this.documentosAnexados = [];
    this.avisoForm = '';
    this.dadosForm = null;
  }

  connectedCallback() {
    this.render();
  }

  paisesDisponiveis() {
    return [...new Set(editais.map(e => e.pais))];
  }

  matchPerfil(edital) {
    return usuario.cre >= edital.requisitoCRE && edital.cursosAceitos.includes(usuario.curso);
  }

  jaInscritoNoEdital(editalId) {
    return inscricoes.some(i => i.editalId === editalId);
  }

  editaisFiltrados() {
    return editais.filter(e => {
      const passaPais = !this.filtroPais || e.pais === this.filtroPais;
      const passaBusca = !this.buscaUniversidade ||
        e.universidade.toLowerCase().includes(this.buscaUniversidade.toLowerCase());
      return passaPais && passaBusca;
    });
  }

  trocarAba(aba) {
    this.aba = aba;
    this.editalSelecionado = null;
    this.render();
  }

  selecionarPais(pais) {
    this.filtroPais = pais;
    this.render();
  }

  abrirCandidatura(id) {
    if (this.jaInscritoNoEdital(id)) {
      mostrarNotificacao('Você já enviou uma inscrição para este edital. Acompanhe o status em "Minhas Inscrições".');
      this.trocarAba('inscricoes');
      return;
    }

    this.editalSelecionado = editais.find(e => e.id === id);
    this.documentosAnexados = [];
    this.avisoForm = '';
    this.dadosForm = {
      nome: usuario.nome,
      matricula: usuario.matricula,
      curso: usuario.curso,
      periodo: `${usuario.periodo}º período`
    };
    this.render();
  }

  voltarParaLista() {
    this.editalSelecionado = null;
    this.avisoForm = '';
    this.render();
  }

  comprimirImagem(file) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onload = (evento) => {
        const img = new Image();
        img.onload = () => {
          const larguraMax = 800;
          const escala = Math.min(1, larguraMax / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = img.width * escala;
          canvas.height = img.height * escala;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.onerror = () => reject(new Error('imagem ilegível'));
        img.src = evento.target.result;
      };
      leitor.onerror = () => reject(new Error('falha ao ler o arquivo'));
      leitor.readAsDataURL(file);
    });
  }

  async processarArquivos(fileList) {
    const arquivos = Array.from(fileList || []);
    if (arquivos.length === 0) return;

    for (const file of arquivos) {
      if (file.type.startsWith('image/')) {
        try {
          const dataUrl = await this.comprimirImagem(file);
          const tamanhoAproxKB = Math.round((dataUrl.length * 0.75) / 1024);
          this.documentosAnexados.push({
            nomeArquivo: file.name,
            formato: file.type.split('/')[1],
            tamanhoKB: tamanhoAproxKB,
            preview: dataUrl
          });
        } catch (erro) {
          this.documentosAnexados.push({
            nomeArquivo: file.name,
            formato: file.type.split('/')[1] || 'imagem',
            tamanhoKB: Math.round(file.size / 1024),
            preview: null
          });
          mostrarNotificacao(`Não foi possível pré-visualizar "${file.name}", mas o arquivo foi anexado.`);
        }
      } else {
        this.documentosAnexados.push({
          nomeArquivo: file.name,
          formato: (file.type.split('/')[1]) || 'pdf',
          tamanhoKB: Math.round(file.size / 1024),
          preview: null
        });
      }
    }
    this.avisoForm = '';
    this.render();
  }

  removerDocumento(index) {
    this.documentosAnexados.splice(index, 1);
    this.render();
  }

  confirmarEnvio() {
    if (this.documentosAnexados.length === 0) {
      this.avisoForm = 'Anexe ao menos um documento (certificado de proficiência) antes de confirmar.';
      this.render();
      return;
    }

    const protocolo = 'INT' + Date.now().toString().slice(-8);
    const novaInscricao = {
      id: inscricoes.length + 1,
      editalId: this.editalSelecionado.id,
      dataEnvio: new Date().toLocaleString('pt-BR'),
      status: 'EM_ANALISE',
      documentos: [...this.documentosAnexados],
      dadosAluno: { ...this.dadosForm },
      protocolo
    };
    inscricoes.push(novaInscricao);

    this.editalSelecionado = null;
    this.aba = 'inscricoes';
    this.render();

    mostrarNotificacao(`Inscrição enviada com sucesso! Protocolo: ${protocolo}.`);
    this.simularAtualizacaoStatus(novaInscricao);
  }

  simularAtualizacaoStatus(inscricao) {
    setTimeout(() => {
      const edital = editais.find(e => e.id === inscricao.editalId);
      const statusPorEdital = {
        1: 'DEFERIDO',      // Alemanha
        2: 'PENDENTE_DOC',  // Portugal
        3: 'INDEFERIDO'     // Canadá
      };
      inscricao.status = statusPorEdital[edital.id] ?? 'EM_ANALISE';
      this.render();
      mostrarNotificacao(`Atualização da inscrição em ${edital.universidade}: status alterado para "${StatusInscricao[inscricao.status].label}".`);
    }, 8000);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * { box-sizing: border-box; }
        .comp-intercambio {
          font-family: "Arimo", sans-serif;
          color: var(--cor-text);
        }
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        .tab-btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background-color: var(--cor-card-bg);
          cursor: pointer;
          font-family: "Arimo", sans-serif;
          font-weight: bold;
          font-size: 14px;
          color: var(--cor-text);
          box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
        }
        .tab-btn.ativa {
          background-color: var(--md-sys-color-primary);
          color: white;
        }
        .input-busca {
          width: 100%;
          padding: 9px 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          border: 1px solid var(--cor-input-border);
          background-color: var(--cor-card-bg);
          color: var(--cor-text);
          font-family: "Arimo", sans-serif;
          font-size: 13px;
        }
        .input-busca:focus {
          outline: none;
          border-color: var(--cor-click);
        }
        .filtros {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }
        .filtro-btn {
          border: 2px solid var(--cor-click);
          background-color: var(--cor-card-bg);
          color: var(--cor-click);
          padding: 6px 14px;
          border-radius: 500px;
          font-size: 13px;
          font-family: "Arimo", sans-serif;
          cursor: pointer;
        }
        .filtro-btn.ativo {
          background-color: var(--cor-click);
          color: white;
        }
        .card-edital {
          position: relative;
          background-color: var(--cor-card-bg);
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 10px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .titulo-edital {
          font-weight: bold;
          font-size: 17px;
          margin-bottom: 4px;
        }
        .info-edital {
          font-size: 13px;
          line-height: 1.6;
          margin: 0 0 10px;
        }
        .badge-match {
          display: inline-block;
          background-color: var(--cor-click);
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 500px;
          margin-bottom: 8px;
        }
        .badge-inscrito {
          display: inline-block;
          background-color: var(--status-deferido);
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 500px;
          margin-bottom: 8px;
        }
        .btn-primario {
          background-color: var(--md-sys-color-primary);
          color: white;
          border: none;
          padding: 9px 18px;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
        }
        .btn-secundario {
          background: none;
          border: 1px solid #999;
          color: var(--cor-text);
          padding: 9px 18px;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
          margin-right: 10px;
        }
        .form-candidatura {
          background-color: var(--cor-card-bg);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .form-candidatura label {
          display: block;
          font-size: 12px;
          font-weight: bold;
          margin: 12px 0 4px;
        }
        .form-candidatura input[type="text"] {
          width: 100%;
          padding: 9px;
          border-radius: 6px;
          border: 1px solid var(--cor-input-border);
          background-color: var(--cor-card-bg);
          font-family: "Arimo", sans-serif;
          font-size: 14px;
          color: var(--cor-text);
        }
        .form-candidatura input[type="text"]:focus {
          outline: none;
          border-color: var(--cor-click);
        }
        .dica-campo {
          font-size: 11px;
          color: var(--cor-text-muted);
          margin-top: 3px;
        }
        .input-arquivo {
          font-size: 13px;
        }
        .preview-arquivo {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
        }
        .preview-arquivo span {
          flex: 1;
        }
        .preview-arquivo img {
          max-width: 90px;
          max-height: 60px;
          border-radius: 6px;
          object-fit: cover;
        }
        .btn-remover-doc {
          background: none;
          border: 1px solid var(--cor-input-border);
          border-radius: 50%;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          color: var(--status-indeferido);
          cursor: pointer;
          font-size: 11px;
          line-height: 1;
        }
        .aviso {
          color: var(--status-indeferido);
          font-size: 12px;
          margin-top: 8px;
        }
        .card-inscricao {
          background-color: var(--cor-card-bg);
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 10px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .status-badge {
          display: inline-block;
          color: white;
          font-size: 11px;
          font-weight: bold;
          padding: 5px 12px;
          border-radius: 500px;
        }
        .protocolo {
          font-size: 12px;
          color: var(--cor-text-muted);
          margin-top: 6px;
        }
        .vazio {
          font-size: 13px;
          color: var(--cor-text-muted);
          text-align: center;
          padding: 20px 0;
        }

        @media (max-width: 600px) {
          .tab-btn { font-size: 13px; padding: 8px; }
          .titulo-edital { font-size: 16px; }
          .info-edital { font-size: 12px; }
          .badge-match, .badge-inscrito { font-size: 11px; padding: 3px 9px; }
          .status-badge { font-size: 10px; padding: 4px 10px; }
          .btn-primario, .btn-secundario { font-size: 12px; padding: 8px 14px; }
          .card-edital, .card-inscricao, .form-candidatura { padding: 12px; }
        }
      </style>

      <div class="comp-intercambio">
        <div class="tabs">
          <button class="tab-btn ${this.aba === 'editais' ? 'ativa' : ''}" id="tabEditais">Editais Disponíveis</button>
          <button class="tab-btn ${this.aba === 'inscricoes' ? 'ativa' : ''}" id="tabInscricoes">Minhas Inscrições ${inscricoes.length ? `(${inscricoes.length})` : ''}</button>
        </div>

        ${this.aba === 'editais' ? this.renderAbaEditais() : this.renderAbaInscricoes()}
      </div>
    `;

    this.attachListeners();

    if (this._manterFocoBusca) {
      const inputBusca = this.shadowRoot.getElementById('buscaUniversidade');
      if (inputBusca) {
        inputBusca.focus();
        const pos = inputBusca.value.length;
        inputBusca.setSelectionRange(pos, pos);
      }
      this._manterFocoBusca = false;
    }
  }

  renderAbaEditais() {
    if (this.editalSelecionado) {
      return this.renderFormularioCandidatura();
    }

    const paises = this.paisesDisponiveis();

    return `
      <input
        type="text"
        id="buscaUniversidade"
        class="input-busca"
        placeholder="Buscar por universidade (ex: Jade University)"
        value="${this.buscaUniversidade}"
      >

      <div class="filtros">
        <button class="filtro-btn ${!this.filtroPais ? 'ativo' : ''}" data-pais="">Todos</button>
        ${paises.map(p => `<button class="filtro-btn ${this.filtroPais === p ? 'ativo' : ''}" data-pais="${p}">${p}</button>`).join('')}
      </div>

      ${this.editaisFiltrados().length === 0 ? '<p class="vazio">Nenhum edital encontrado para esse filtro/busca.</p>' : ''}

      ${this.editaisFiltrados().map(edital => {
        const inscrito = this.jaInscritoNoEdital(edital.id);
        return `
        <div class="card-edital">
          ${inscrito
            ? '<div class="badge-inscrito">✓ Inscrição já enviada</div>'
            : (this.matchPerfil(edital) ? '<div class="badge-match">★ Match de Perfil</div>' : '')}
          <div class="titulo-edital">${edital.universidade} - ${edital.pais}</div>
          <p class="info-edital">
            Idioma: <b>${edital.idioma}</b><br>
            CRE mínimo exigido: <b>${edital.requisitoCRE.toFixed(1)}</b><br>
            Prazo de inscrição: <b>${edital.prazoInscricao}</b><br>
            ${edital.descricao}
          </p>
          ${inscrito
            ? `<button class="btn-secundario btn-ver-inscricao" data-id="${edital.id}">Ver minha inscrição</button>`
            : `<button class="btn-primario btn-candidatar" data-id="${edital.id}">Ver detalhes e candidatar-se</button>`}
        </div>
      `;
      }).join('')}
    `;
  }

  renderFormularioCandidatura() {
    const edital = this.editalSelecionado;
    const dados = this.dadosForm;

    return `
      <div class="form-candidatura">
        <div class="titulo-edital">${edital.universidade} - ${edital.pais}</div>
        <p class="info-edital">${edital.descricao}</p>

        <label>Nome</label>
        <input type="text" id="campoNome" value="${dados.nome}">

        <label>Matrícula</label>
        <input type="text" id="campoMatricula" value="${dados.matricula}">

        <label>Curso</label>
        <input type="text" id="campoCurso" value="${dados.curso}">

        <label>Período</label>
        <input type="text" id="campoPeriodo" value="${dados.periodo}">
        <div class="dica-campo">Esses dados já vêm preenchidos a partir do seu cadastro, mas você pode clicar e editar antes de enviar.</div>

        <label>Documentos (Certificado de Proficiência e outros, se necessário)</label>
        <input type="file" class="input-arquivo" id="inputArquivo" accept=".pdf,.png,.jpg,.jpeg" multiple>
        <div class="dica-campo">Pode selecionar mais de um arquivo de uma vez, ou anexar um por vez — todos ficam na lista abaixo.</div>

        ${this.documentosAnexados.map((doc, i) => `
          <div class="preview-arquivo">
            ${doc.preview ? `<img src="${doc.preview}" alt="preview">` : '📄'}
            <span>${doc.nomeArquivo} (~${doc.tamanhoKB}KB, otimizado para envio)</span>
            <button type="button" class="btn-remover-doc" data-index="${i}" aria-label="Remover">✕</button>
          </div>
        `).join('')}

        ${this.avisoForm ? `<div class="aviso">${this.avisoForm}</div>` : ''}

        <div style="margin-top:20px;">
          <button class="btn-secundario" id="btnVoltar">Cancelar</button>
          <button class="btn-primario" id="btnConfirmar">Confirmar Envio</button>
        </div>
      </div>
    `;
  }

  renderAbaInscricoes() {
    if (inscricoes.length === 0) {
      return `<p class="vazio">Você ainda não enviou nenhuma inscrição de intercâmbio.</p>`;
    }

    return inscricoes.slice().reverse().map(inscricao => {
      const edital = editais.find(e => e.id === inscricao.editalId);
      const status = StatusInscricao[inscricao.status];
      const listaDocs = inscricao.documentos
        .map(d => `${d.nomeArquivo} (${d.formato.toUpperCase()}, ~${d.tamanhoKB}KB)`)
        .join('<br>');
      return `
        <div class="card-inscricao">
          <div class="titulo-edital">${edital.universidade} - ${edital.pais}</div>
          <span class="status-badge" style="background-color:${status.cor}">${status.label}</span>
          <p class="info-edital">
            Documento(s) enviado(s):<br><b>${listaDocs}</b><br>
            Data de envio: <b>${inscricao.dataEnvio}</b>
          </p>
          <div class="protocolo">Protocolo: ${inscricao.protocolo}</div>
        </div>
      `;
    }).join('');
  }

  attachListeners() {
    const root = this.shadowRoot;

    root.getElementById('tabEditais')?.addEventListener('click', () => this.trocarAba('editais'));
    root.getElementById('tabInscricoes')?.addEventListener('click', () => this.trocarAba('inscricoes'));

    root.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.addEventListener('click', () => this.selecionarPais(btn.dataset.pais || null));
    });

    root.getElementById('buscaUniversidade')?.addEventListener('input', (e) => {
      this.buscaUniversidade = e.target.value;
      this._manterFocoBusca = true;
      this.render();
    });

    root.querySelectorAll('.btn-candidatar').forEach(btn => {
      btn.addEventListener('click', () => this.abrirCandidatura(Number(btn.dataset.id)));
    });

    root.querySelectorAll('.btn-ver-inscricao').forEach(btn => {
      btn.addEventListener('click', () => this.trocarAba('inscricoes'));
    });

    root.getElementById('btnVoltar')?.addEventListener('click', () => this.voltarParaLista());
    root.getElementById('btnConfirmar')?.addEventListener('click', () => this.confirmarEnvio());

    root.getElementById('inputArquivo')?.addEventListener('change', (e) => {
      this.processarArquivos(e.target.files);
      e.target.value = '';
    });

    root.querySelectorAll('.btn-remover-doc').forEach(btn => {
      btn.addEventListener('click', () => this.removerDocumento(Number(btn.dataset.index)));
    });

    const camposEditaveis = {
      campoNome: 'nome',
      campoMatricula: 'matricula',
      campoCurso: 'curso',
      campoPeriodo: 'periodo'
    };
    Object.entries(camposEditaveis).forEach(([elId, chave]) => {
      root.getElementById(elId)?.addEventListener('input', (e) => {
        if (this.dadosForm) this.dadosForm[chave] = e.target.value;
      });
    });
  }
}
customElements.define('intercambio-component', IntercambioComponent);
