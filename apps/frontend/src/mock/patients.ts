export type Patient = {
  id: string;
  nomeCompleto: string;
  telefone: string;
  medico: string;
  especialidade: string;
  statusCheckin: "pendente" | "feito";
  statusPagamento: "pendente" | "pago";
  valor: number;
  fotoMedico: string;
  fotoTirada?: boolean;
  appointment?: {
    data: string;
    hora: string;
    endereco: string;
    tipo: "Primeira consulta" | "Retorno";
  };
};

const clinicAddress = "Rua das Palmeiras, 120 - Centro";

const generateAppointment = (index: number): Patient["appointment"] => ({
  data: "13/11/2025",
  hora: `${String(8 + (index % 8)).padStart(2, "0")}:${index % 2 === 0 ? "00" : "30"}`,
  endereco: clinicAddress,
  tipo: index % 2 === 0 ? "Primeira consulta" : "Retorno",
});

const basePatients: Patient[] = [
  {
    id: "pb",
    nomeCompleto: "Bruna Siqueira Andrade",
    telefone: "11911110001",
    medico: "Helena Faria",
    especialidade: "Dermatologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 420,
    fotoMedico:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&w=400&q=60",
  },
  {
    id: "plm",
    nomeCompleto: "Leonardo Marques",
    telefone: "11988886666",
    medico: "Renata Campos",
    especialidade: "Clínica Geral",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 500,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e5?auto=format&w=400&q=60",
  },
  {
    id: "pc",
    nomeCompleto: "Caio Mendes Rezende",
    telefone: "11911110002",
    medico: "Rafael Costeira",
    especialidade: "Cardiologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 580,
    fotoMedico:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&w=400&q=60",
  },
  {
    id: "pd",
    nomeCompleto: "Daniela Prado Ribeiro",
    telefone: "11911110003",
    medico: "Ana Lins",
    especialidade: "Ginecologia",
    statusCheckin: "pendente",
    statusPagamento: "pago",
    valor: 460,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=400&q=60",
  },
  {
    id: "pf",
    nomeCompleto: "Fabio Couto Lima",
    telefone: "11911110004",
    medico: "Bruno Sanches",
    especialidade: "Ortopedia",
    statusCheckin: "feito",
    statusPagamento: "pendente",
    valor: 510,
    fotoMedico:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&w=400&q=60",
  },
  {
    id: "pg",
    nomeCompleto: "Gabriel Nogueira Sales",
    telefone: "11911110005",
    medico: "Paula Rezende",
    especialidade: "Endocrinologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 540,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=400&q=60",
  },
  {
    id: "ph",
    nomeCompleto: "Helder Lopes Moura",
    telefone: "11911110006",
    medico: "Juliana Prado",
    especialidade: "Neurologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 650,
    fotoMedico:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=400&q=60",
  },
  {
    id: "pj",
    nomeCompleto: "Joice Martins Tavares",
    telefone: "11911110007",
    medico: "Claudio Antunes",
    especialidade: "Oncologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 590,
    fotoMedico:
      "https://images.unsplash.com/photo-1544723795-432537f4c7ff?auto=format&w=400&q=60",
  },
  {
    id: "pk",
    nomeCompleto: "Karen Brito Lopes",
    telefone: "11911110008",
    medico: "Patrícia Vilela",
    especialidade: "Pediatria",
    statusCheckin: "pendente",
    statusPagamento: "pago",
    valor: 360,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e2?auto=format&w=400&q=60",
  },
  {
    id: "pl",
    nomeCompleto: "Laura Mendes Rocco",
    telefone: "11911110009",
    medico: "Helena Faria",
    especialidade: "Dermatologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 430,
    fotoMedico:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&w=400&q=60",
  },
  {
    id: "pm",
    nomeCompleto: "Marcos Teixeira Prado",
    telefone: "11911110010",
    medico: "Eduardo Melo",
    especialidade: "Oftalmologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 470,
    fotoMedico:
      "https://images.unsplash.com/photo-1504593811423-6dd665756599?auto=format&w=400&q=60",
  },
  {
    id: "pn",
    nomeCompleto: "Natália Cunha Ribeiro",
    telefone: "11911110011",
    medico: "Fernanda Barreto",
    especialidade: "Reumatologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 520,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e3?auto=format&w=400&q=60",
  },
  {
    id: "pp",
    nomeCompleto: "Paulo Sérgio Mattos",
    telefone: "11911110012",
    medico: "Livia Caldas",
    especialidade: "Gastroenterologia",
    statusCheckin: "pendente",
    statusPagamento: "pago",
    valor: 600,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e4?auto=format&w=400&q=60",
  },
  {
    id: "pq",
    nomeCompleto: "Quitéria Souza Braga",
    telefone: "11911110013",
    medico: "Samuel Rocha",
    especialidade: "Psiquiatria",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 480,
    fotoMedico:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43f?auto=format&w=400&q=60",
  },
  {
    id: "pr",
    nomeCompleto: "Rodrigo Naves Prado",
    telefone: "11911110014",
    medico: "Luciana Pires",
    especialidade: "Otorrinolaringologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 390,
    fotoMedico:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b33?auto=format&w=400&q=60",
  },
  {
    id: "ps",
    nomeCompleto: "Sabrina Duarte Nunes",
    telefone: "11911110015",
    medico: "Giovana Mello",
    especialidade: "Fonoaudiologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 350,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e5?auto=format&w=400&q=60",
  },
  {
    id: "pt",
    nomeCompleto: "Thiago Porto Campos",
    telefone: "11911110016",
    medico: "Rafaela Diniz",
    especialidade: "Nutrologia",
    statusCheckin: "pendente",
    statusPagamento: "pago",
    valor: 400,
    fotoMedico:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a440?auto=format&w=400&q=60",
  },
  {
    id: "pv",
    nomeCompleto: "Vitor Azevedo Seixas",
    telefone: "11911110017",
    medico: "Felipe Garcia",
    especialidade: "Urologia",
    statusCheckin: "feito",
    statusPagamento: "pendente",
    valor: 620,
    fotoMedico:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b34?auto=format&w=400&q=60",
  },
  {
    id: "pw",
    nomeCompleto: "Wagner Lopes Silveira",
    telefone: "11911110018",
    medico: "Bruna Caires",
    especialidade: "Fisiatria",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 450,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e6?auto=format&w=400&q=60",
  },
  {
    id: "px",
    nomeCompleto: "Xavier Moreira Paes",
    telefone: "11911110019",
    medico: "Tatiane Souza",
    especialidade: "Hematologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 610,
    fotoMedico:
      "https://images.unsplash.com/photo-1504593811423-6dd665756510?auto=format&w=400&q=60",
  },
  {
    id: "py",
    nomeCompleto: "Yasmin Oliveira Prado",
    telefone: "11911110020",
    medico: "Cristina Matos",
    especialidade: "Osteopatia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 390,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e7?auto=format&w=400&q=60",
  },
  {
    id: "pz",
    nomeCompleto: "Zuleica Ramos Batista",
    telefone: "11911110021",
    medico: "Henrique Prado",
    especialidade: "Imunologia",
    statusCheckin: "pendente",
    statusPagamento: "pendente",
    valor: 570,
    fotoMedico:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e8?auto=format&w=400&q=60",
  },
];

export const patientsSeed: Patient[] = basePatients.map((patient, index) => ({
  ...patient,
  appointment: patient.appointment ?? generateAppointment(index),
}));
