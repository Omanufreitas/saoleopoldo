export interface Loja {
  numero: string;
  bairro: string;
  endereco: string;
  telefone: string;
  whatsapp: string;
  maps: string;
  h24?: boolean;
}

export const lojas: Loja[] = [
  {
    numero: "01",
    bairro: "Centro",
    endereco: "R. Mal. Cândido Mariano Rondon, 2.172, Centro",
    telefone: "(67) 3389-4100",
    whatsapp: "5567998384100",
    maps: "https://maps.app.goo.gl/ewwdBedFFGvqMNfA7",
    h24: true,
  },
  {
    numero: "02",
    bairro: "Jardim Allah",
    endereco: "Av. Eduardo Elias Zahran, 979, Jardim Allah",
    telefone: "(67) 3389-4102",
    whatsapp: "5567996045700",
    maps: "https://maps.app.goo.gl/yuZHY3Q7GNLWQY7i8",
  },
  {
    numero: "03",
    bairro: "Vila Sobrinho",
    endereco: "Av. Júlio de Castilho, 660, Vila Sobrinho",
    telefone: "(67) 3389-4103",
    whatsapp: "5567998257166",
    maps: "https://maps.app.goo.gl/vACLKvW5epZdcPuL6",
  },
  {
    numero: "04",
    bairro: "Nova Lima",
    endereco: "R. Zulmira Borba, 841, Nova Lima",
    telefone: "(67) 3389-4104",
    whatsapp: "5567991032181",
    maps: "https://maps.app.goo.gl/Fd8qSfGfhGkFdQoN6",
  },
  {
    numero: "05",
    bairro: "Nova Lima",
    endereco: "R. Zulmira Borba, 1.351, Nova Lima",
    telefone: "(67) 3389-4105",
    whatsapp: "5567999831431",
    maps: "https://maps.app.goo.gl/BqPL8hquUjDzDSFJ9",
  },
  {
    numero: "06",
    bairro: "Vila Margarida",
    endereco: "Av. Coronel Antonino, 1.780, Vila Margarida",
    telefone: "(67) 3389-4106",
    whatsapp: "556733894106",
    maps: "https://maps.app.goo.gl/RtjRVBAic3RbthWG7",
  },
  {
    numero: "07",
    bairro: "Trevo Imbirussu",
    endereco: "Av. Bandeirantes, 3.912, Trevo Imbirussu",
    telefone: "(67) 3389-4107",
    whatsapp: "556733894107",
    maps: "https://maps.app.goo.gl/CN99Y1c8eDbZqU839",
  },
  {
    numero: "08",
    bairro: "Vila Sobrinho",
    endereco: "Av. Júlio de Castilho, 1.120, Vila Sobrinho",
    telefone: "(67) 3389-4108",
    whatsapp: "5567998030457",
    maps: "https://maps.app.goo.gl/pkdWjA4rom9CTrzH8",
  },
  {
    numero: "09",
    bairro: "Bairro Universitário",
    endereco: "Av. Guaicurus, 3.586, Bairro Universitário",
    telefone: "(67) 3389-4109",
    whatsapp: "556733894109",
    maps: "https://maps.app.goo.gl/1dDtcg7ik5NF2Hf99",
  },
  {
    numero: "10",
    bairro: "Chácara Cachoeira",
    endereco: "Rua Raul Pires Barbosa, 1.040, Chácara Cachoeira",
    telefone: "(67) 3389-4110",
    whatsapp: "556733894110",
    maps: "https://maps.app.goo.gl/3KcPSurJ1nNYFFke6",
  },
  {
    numero: "11",
    bairro: "São Francisco",
    endereco: "Av. Euler de Azevedo, 1.128, Bairro São Francisco",
    telefone: "(67) 3389-4111",
    whatsapp: "556733894111",
    maps: "https://maps.app.goo.gl/P81RMcHzDmBRAupH9",
  },
  {
    numero: "12",
    bairro: "Jardim Noroeste",
    endereco: "Rua Vaz de Caminha, 1.200, Jardim Noroeste",
    telefone: "(67) 3389-4112",
    whatsapp: "556733894112",
    maps: "https://maps.app.goo.gl/E5Qqyx91sx9xCtaQ8",
  },
  {
    numero: "13",
    bairro: "Vila Nascente",
    endereco: "Av. Hiroshima, 685, Vila Nascente",
    telefone: "(67) 3389-4113",
    whatsapp: "556733894113",
    maps: "https://www.google.com/maps/search/?api=1&query=Drogaria+S%C3%A3o+Leopoldo+Av.+Hiroshima%2C+685%2C+Vila+Nascente%2C+Campo+Grande+MS",
  },
];

export const siteConfig = {
  nome: "Drogaria São Leopoldo",
  fundacao: "17 de setembro de 2001",
  fundador: "Atila Barbosa de Oliveira",
  anoFundacao: 2001,
  tagline: "Quem tem São Leopoldo, tem saúde.",
  email: "sac@drogariasaoleopoldo.com.br",
  telefonePrincipal: "(67) 3389-4100",
  whatsappPrincipal: "5567998384100",
  endereco: "R. Padre João Crippa, 1598, Jardim Vila Cidade — Campo Grande/MS",
  facebook: "https://www.facebook.com/drogariasl",
  instagram: "https://www.instagram.com/drogariasaoleopoldo/?hl=pt-br",
  transparencia:
    "https://drogariasaoleopoldo.com.br/wp-content/uploads/2026/04/TRANSPARENCIA-SALARIAL.pdf",
  logoUrl: "https://drogariasaoleopoldo.com.br/wp-content/uploads/2025/08/asdsa.png",
  fotoFachada: "https://drogariasaoleopoldo.com.br/wp-content/uploads/2025/08/fotofrente2.webp",
};
