**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de Negócio


# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RNF**

**RN**
Não deve ser possível cadastrar com uma placa já existente.
Não deve ser possível alterar a placa de um carro cadastrado.
O carro deve ser cadastrado como disponível por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RNF**

**RN**
O usuário não precisa estar logado no sistema

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RNF**

**RN**
Não deve ser possível cadastrar especificação para carro não existente.
Não deve ser possível cadastrar especificação já existente para o mesmo carro.


# Cadastro de imagens do carro de

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload do arquivo.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carros

**RF**
Deve ser possível cadastrar um aluguel.

**RNF**

**RN**

O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro.